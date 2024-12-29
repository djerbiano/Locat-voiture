const { User } = require("../models/Users");
const { Booking } = require("../models/Bookings");
const { handleErrors, verifiyIdMongoDb } = require("../utils/helpers");
const { validateNewMail } = require("../models/Users");

const controller = {
  // PatchUser
  updateUser: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.idUser)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }

      let updateFields = {};

      // modification mail avec validation
      if (req.body.email) {
        // Vérifier si le nouvel email existe déjà
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
          return handleErrors(res, 400, {
            message: "Email est déja utilisé",
          });
        } else {
          const { error: emailError } = validateNewMail({
            email: req.body.email,
          });

          if (emailError) {
            return handleErrors(res, 400, {
              message: emailError.details[0].message,
            });
          }

          updateFields.email = req.body.email;
        }
      }
      const fieldsToUpdate = [
        "name",
        "lastName",
        "phone",
        "address",
        "isAdmin",
      ];

      fieldsToUpdate.forEach((field) => {
        if (req.body[field]) {
          updateFields[field] = req.body[field];
        }
      });
      if (Object.keys(updateFields).length === 0) {
        return handleErrors(res, 400, {
          message: "Veuillez renseigner au moins un champ",
        });
      }
      const user = await User.updateOne(
        { _id: req.params.idUser },
        updateFields,
        { new: true, runValidators: true }
      );
      if (!user) {
        return handleErrors(res, 404, {
          message: "Utilisateur introuvable",
        });
      }
      return handleErrors(res, 200, {
        message: "Le profil a bien été mis à jour",
      });
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

      const user = await User.findByIdAndDelete(req.params.idUser);
      if (!user) {
        return handleErrors(res, 404, {
          message: "Utilisateur introuvable",
        });
      }

      res.status(200).json({ message: "Utilisateur supprimé" });
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

      const user = await User.findById(req.params.idUser).select("-password");
      if (!user) {
        return handleErrors(res, 404, {
          message: "Utilisateur introuvable",
        });
      }
      res.status(200).json(user);
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
