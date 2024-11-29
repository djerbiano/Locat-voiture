const mongoose = require("mongoose");
const { Car } = require("../models/Cars");
const { User } = require("../models/Users");
const {
  Booking,
  validateBooking,
  validateBookingComments,
} = require("../models/Bookings");
const { handleErrors } = require("../utils/helpers");

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

      // version final après test

      const car = await Car.findOne({ _id: req.body.voiture });
      if (!car) {
        return handleErrors(res, 404, {
          message: "Cette voiture n'existe pas",
        });
      }

      // a faire : vérifier si la voiture est disponible ( X ) le stockofCar
      /*
      
      
      
      */

      const booking = new Booking(req.body);
      await booking.save();

      // ajout de la reservation dans l'agenda de la voiture
      car.bookings.push(booking._id);
      await car.save();
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

  // updateBooking with admin
  updateBooking: async (req, res) => {
    try {
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // deleteBooking
  deleteBooking: async (req, res) => {
    try {
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // getAllBookings for user
  getAllBookingsForUser: async (req, res) => {
    try {
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
  // getBookingById
  getBookingById: async (req, res) => {
    try {
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
  // getAllBooking for admin
  getAllBookingsForAdmin: async (req, res) => {
    try {
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
