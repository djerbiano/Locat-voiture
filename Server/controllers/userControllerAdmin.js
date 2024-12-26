const { User } = require("../models/Users");
const { Booking } = require("../models/Bookings");
const { handleErrors, verifiyIdMongoDb } = require("../utils/helpers");

const controller = {
  // PatchUser
  updateUser: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.idUser)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({})
        .populate("booking")
        .select("-password")
        .sort({ email: 1 });
      if (users.length < 1) {
        return res.status(200).json({ message: "Aucun utilisateur trouvé" });
      }
      res.status(200).json(users);
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // delete user
  deleteUser: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.idUser)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
  // Get user by id
  getUserById: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.idUser)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
