const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  validateRegisterUser,
  validateNewPassword,
  validateNewMail,
  validateLoginUser,
} = require("../models/Users");
const sendMailCreateCompte = require("../mails/register");
const sendMailUpdateUser = require("../mails/updateUser");
const sendMailDeleteCompte = require("../mails/deleteCompte");
const { deleteImage, handleErrors } = require("../utils/helpers");
const { object } = require("joi");

const controller = {
  // registerUser
  registerUser: async (req, res) => {
    try {
      const { error } = validateRegisterUser(req.body);

      if (error) {
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }

      // Vérifier si l'e-mail existe déjà
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return handleErrors(res, 400, {
          message: "Merci de saisir une autre adresse e-mail",
        });
      }

      // Hacher le mot de passe avant de l'enregistrer
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password.trim(), salt);

      user = new User(req.body);

      // Enregistrer l'utilisateur dans la base de données
      const result = await user.save();

      // Générer un token JWT pour l'utilisateur
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "5h",
        }
      );

      // Exclure certaines propriétés du document résultant
      const { password, updatedAt, __v, ...other } = result._doc;

      // envoyer un mail de Bienvenue
      sendMailCreateCompte(req.body.email);

      res
        .status(201)
        .json([
          { message: `${result.email} votre compte a bien être créé` },
          { ...other },
          { token },
        ]);
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // loginUser
  loginUser: async (req, res) => {
    try {
      const { error } = validateLoginUser(req.body);

      if (error) {
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }

      // Vérifier si l'utilisateur existe
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // Vérifier si le mot de passe correspond
        const isPasswordMatch = await bcrypt.compare(
          req.body.password.trim(),
          user.password
        );

        if (user && isPasswordMatch) {
          // Générer un token JWT pour l'utilisateur
          const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, email: user.email },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "5h",
            }
          );
          const { password, updatedAt, __v, ...other } = user._doc;
          return res
            .status(200)
            .json([
              { message: ` ${user.email} vous êtes bien connecté` },
              { ...other },
              { token },
            ]);
        } else {
          return handleErrors(res, 401, {
            message: "Vous avez saisi un email ou un mot de passe incorrect",
          });
        }
      } else {
        return handleErrors(res, 401, {
          message: "Un problème est survenu, veuillez réessayer",
        });
      }
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // UpdateUser
  updateUser: async (req, res) => {
    try {
      let compteExiste = await User.findOne({ _id: req.user.id });

      // Vérification du token
      if (compteExiste == null) {
        return handleErrors(res, 403, {
          message:
            "Vous devez être connecté pour pouvoir modifier votre compte",
        });
      }

      let user = await User.findOne({ email: req.params.email });

      if (!user || req.params.email !== req.user.email) {
        return handleErrors(res, 404, {
          message: "Profile non trouvé ou non autorisé",
        });
      }

      let updateFields = {};

      // modification de password avec validation
      if (req.body.password) {
        const { error: passwordError } = validateNewPassword({
          password: req.body.password,
        });

        if (passwordError) {
          return handleErrors(res, 400, {
            message: passwordError.details[0].message,
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
          req.body.password.trim(),
          salt
        );
        updateFields.password = hashedPassword;
      }
      // modification mail avec validation
      if (req.body.email) {
        // Vérifier si le nouvel email existe déjà
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
          return handleErrors(res, 400, {
            message: "Veuillez saisir une autre adresse email",
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

      // modification des autres informations sans validation
      const fieldsToUpdate = ["name", "lastName", "phone", "address"];

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

      // envoyer le mail de modification de compte
      let fields = Object.keys(updateFields).join("-");
      sendMailUpdateUser(user.email, fields);

      await User.updateOne({ email: req.params.email }, updateFields);

      return handleErrors(res, 200, {
        message: "Le profil a bien été mis à jour",
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // DeleteUser
  deleteUser: async (req, res) => {
    try {
      let compteExiste = await User.findOne({ _id: req.user.id });

      // Vérification du token
      if (compteExiste == null) {
        return handleErrors(res, 403, {
          message: "Vous devez être connecté pour supprimer votre compte",
        });
      }

      // suppression par admin
      if (compteExiste.isAdmin) {
        await User.deleteOne({ email: req.params.email });

        sendMailDeleteCompte(
          req.user.email,
          "Nous avons supprimé votre compte"
        );

        return handleErrors(res, 200, {
          message: "Le compte a bien été supprimé par un administrateur",
        });
      }

      let user = await User.findOne({ email: req.params.email });

      // Vérifier si l'utilisateur est autorisé à supprimer son compte
      if (!user || req.params.email !== req.user.email) {
        return handleErrors(res, 404, {
          message: "Profile non trouvé ou non autorisé",
        });
      }

      //supprimer le compte
      await User.deleteOne({ email: req.params.email });

      // envoyer le mail de suppression de compte
      sendMailDeleteCompte(user.email, "Le compte a bien été supprimé");

      /*supprimer les réservations
       ***********************
       *
       *
       *
       *
       * *********************
       */

      return handleErrors(res, 200, {
        message: "Le compte a bien été supprimé",
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
