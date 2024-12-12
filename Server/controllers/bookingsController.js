const mongoose = require("mongoose");
const { Car } = require("../models/Cars");
const { User } = require("../models/Users");
const {
  Booking,
  validateBooking,
  validateBookingComments,
} = require("../models/Bookings");
const { handleErrors, verifiyIdMongoDb } = require("../utils/helpers");
const sendMailBookingSave = require("../mails/reservationMails/sendMailBookingSave");
const bookingDeleteSendMail = require("../mails/reservationMails/bookingDeleteSendMail");
const bookingCancelSendMail = require("../mails/reservationMails/bookingCancelSendMail");

const controller = {
  // registerBooking
  registerBooking: async (req, res) => {
    try {
      // validation de la data
      const { error } = validateBooking(req.body);
      if (error) {
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }

      // vérifier si le client est déjà enregistré
      const user = await User.findOne({ _id: req.user.id });
      if (!user) {
        return handleErrors(res, 404, {
          message: "Veuillez vous connecter",
        });
      }

      // verifier si la voiture existe

      const car = await Car.findOne({ _id: req.body.voiture }).populate({
        path: "bookings",
      });
      if (!car) {
        return handleErrors(res, 404, {
          message: "Cette voiture n'existe pas",
        });
      }

      //  vérifier si la voiture est disponible ( X ) le stockofCar

      const { startDate: newBookingStart, endDate: newBookingEnd } = req.body;
      let activeBookings = 0;

      if (car.bookings.length > 0) {
        for (let booking of car.bookings) {
          if (
            ["En-attente", "acceptée"].includes(booking.status) &&
            new Date(newBookingStart) <= new Date(booking.endDate) &&
            new Date(newBookingEnd) >= new Date(booking.startDate)
          ) {
            activeBookings++;
            if (activeBookings >= car.stockOfCar) {
              return handleErrors(res, 406, {
                message: "Cette voiture est déjà réservée pour cette période.",
              });
            }
          }
        }
      }

      const booking = new Booking(req.body);
      await booking.save();

      // ajout de la reservation dans l'agenda de la voiture
      car.bookings.push(booking._id);
      await car.save();

      // ajout de la reservation dans l'agenda de l'utilisateur
      user.booking.push(booking._id);
      await user.save();

      // envoyer un e-mail au client
      sendMailBookingSave(user.email);

      return res.status(200).json({
        message:
          "Votre réservation est enregistrée. Vous recevrez un e-mail dès qu'elle sera acceptée.",
      });
    } catch (error) {
      console.log(error.message);
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // deleteBooking
  deleteBooking: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.id)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }

      // trouver la réservation
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return handleErrors(res, 404, {
          message: "Réservation introuvable",
        });
      }

      // vérifier si l'utilisateur est administrateur ou propriétaire de la réservation
      if (!req.user.isAdmin && req.user.id !== booking.user.toString()) {
        return handleErrors(res, 403, {
          message: "Vous devez être le propriétaire de la réservation",
        });
      }

      // verifier si la réservation est supprimable
      if (booking.status === "En-attente" || booking.status === "acceptée") {
        return handleErrors(res, 400, {
          message: "Vous ne pouvez pas supprimer cette réservation qui est en cours",
        });
      }

      if(!req.user.isAdmin && !booking.deleteWithUser){
        return handleErrors(res, 400, {
          message: "Vous ne pouvez pas supprimer cette réservation",
        });
      }

      // supprimer la réservation
      await booking.deleteOne();

      // supprimer la réservation dans l'agenda de la voiture
      const car = await Car.findById(booking.voiture);
      if (!car) {
        return handleErrors(res, 404, {
          message: "Cette voiture n'existe pas",
        });
      }
      car.bookings.pull(booking._id);
      await car.save();

      // supprimer la réservation dans l'agenda de l'utilisateur
      const user = await User.findById(booking.user);
      if (!user) {
        return handleErrors(res, 404, {
          message: "Ce client n'existe pas",
        });
      }

      user.booking.pull(booking._id);
      await user.save();

      // envoyer un e-mail au client
      bookingDeleteSendMail(user.email);

      return res.status(200).json({
        message: "Réservation supprimée avec succès",
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // getAllBookings for user
  getAllBookingsForUser: async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.id }).populate(
        "voiture"
      ).sort({startDate:1});

      if (bookings.length < 1) {
        return res.status(200).json({
          bookings,
          message: "Aucune réservation pour ce client",
        });
      }

      return res.status(200).json({
        bookings,
        Total: bookings.length,
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
  // getBookingById for user
  getBookingById: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.id)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }

      // trouver la réservation
      const booking = await Booking.findById(req.params.id).populate("voiture");
      if (!booking) {
        return handleErrors(res, 404, {
          message: "Réservation introuvable",
        });
      }

      // verifier si l'utilisateur est propriétaire de la réservation
      if (req.user.id !== booking.user.toString()) {
        return handleErrors(res, 403, {
          message: "Vous devez être le propriétaire de la réservation",
        });
      }

      return res.status(200).json({
        booking,
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // cancelBooking by user before 48 hours
  cancelBooking: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.id)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }

      // trouver la réservation
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return handleErrors(res, 404, {
          message: "Réservation introuvable",
        });
      }

      // verifier si l'utilisateur est propriétaire de la réservation
      if (req.user.id !== booking.user.toString()) {
        return handleErrors(res, 403, {
          message: "Vous devez être le propriétaire de la réservation",
        });
      }

      // verifier si la Réervation est avant 48 heures

      const now = new Date();
      const startDate = new Date(booking.startDate);

      //( moins 48h * 60min * 60s * 1000ms = 172800000 milliseconds)
      const fortyEightHoursBeforeStart =
        new Date(booking.startDate).getTime() - 48 * 60 * 60 * 1000;

      if (now.getTime() <= fortyEightHoursBeforeStart) {
        // verifier si la réservation est annulable
        if (
          booking.status !== "terminée" &&
          booking.status !== "annulée" &&
          booking.status !== "refusée"
        ) {
          // annuler la réservation
          booking.status = "annulée";
          await booking.save();

          // envoyer un e-mail au client
          bookingCancelSendMail(req.user.email);

          return res.status(200).json({
            message: "Réservation annulée",
          });
        } else {
          return handleErrors(res, 403, {
            message: `La réservation n'est plus annulable car elle est déjà ${booking.status}`,
          });
        }
      } else {
        return handleErrors(res, 403, {
          message:
            "La réservation est annulable avant 48 heures de son commencement",
        });
      }
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
