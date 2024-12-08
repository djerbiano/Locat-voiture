const mongoose = require("mongoose");
const { Booking, updateBookingWithAdmin } = require("../models/Bookings");
const { handleErrors, verifiyIdMongoDb } = require("../utils/helpers");
const bookingUpdateWithAdmin = require("../mails/reservationMails/bookingUpdateWithAdmin");
const controller = {
  // PatchBooking
  updateBooking: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.id)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }

      // validation de la data
      const { error } = updateBookingWithAdmin(req.body);
      if (error) {
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }

      const booking = await Booking.findById(req.params.id).populate("user");
      if (!booking) {
        return handleErrors(res, 404, {
          message: "Réservation introuvable",
        });
      }

      const userEmail = booking.user.email;

      // modifier la réservation
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      // envoyer un mail au client
      bookingUpdateWithAdmin(userEmail, updatedBooking.status);
      return res.status(200).json({
        updatedBooking,
      });
    } catch (error) {
      console.log(error.message);
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Get all Bookings for admin
  getAllBookingsForAdmin: async (req, res) => {
    try {
      const bookings = await Booking.find({})
        .populate({
          path: "user",
          select: "-password -tokenRestPassword -isAdmin -avatar -booking",
        })
        .populate("voiture");
      if (bookings.length < 1) {
        return handleErrors(res, 404, {
          message: "Aucune réservation trouvée",
        });
      }
      return res.status(200).json({
        bookings,
        Total: bookings.length,
      });
    } catch (error) {
      console.log(error.message);
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
  // Get Booking by id for admin
  getBookingByIdForAdmin: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.id)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }

      const booking = await Booking.findById(req.params.id)
        .populate({
          path: "user",
          select: "-password -tokenRestPassword -isAdmin -avatar -booking",
        })
        .populate("voiture");
      if (!booking) {
        return handleErrors(res, 404, {
          message: "Réservation introuvable",
        });
      }
      return res.status(200).json({
        booking,
      });
    } catch (error) {
      console.log(error.message);
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
