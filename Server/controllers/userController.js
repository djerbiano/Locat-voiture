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
const resetPasswordSendLink = require("../mails/resetPasswordSendLink");
const validationNewPassword = require("../mails/validationNewPassword");
const { handleErrors, verifiyIdMongoDb } = require("../utils/helpers");

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

  // getUser
  getUser: async (req, res) => {
    try {
      // vérifier si l'ID de la réservation est valide
      if (!verifiyIdMongoDb(req.params.idUser)) {
        return handleErrors(res, 400, { message: "ID invalide" });
      }

      // s'assurer que le user est le propriétaire du token
      if (req.user.id !== req.params.idUser) {
        return handleErrors(res, 403, {
          message: "Vous devez avoir le droit de voir ce compte",
        });
      }

      const user = await User.findById(req.user.id).select("-password -__v -booking -isAdmin -tokenRestPassword");
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

          // protection contre la réutilisation du lien concernant le changement de mot de passe (ca repasse a unvalidate si le lien est utilisé ou le user se connecte)
          if (user.tokenRestPassword === "validate") {
            await User.updateOne(
              { _id: user._id },
              { $set: { tokenRestPassword: "unvalidate" } }
            );
          }
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

  // Renistialize password link for user
  resetPasswordSendLink: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });

      if (!user) {
        return handleErrors(res, 404, {
          message:
            "Si votre adresse e-mail est enregistrée dans notre base de données, vous recevrez dans quelque minutes un e-mail contenant un lien pour réinitialiser votre mot de passe. Veuillez vérifier votre boîte de réception, y compris les courriers indésirable.",
        });
      }

      // protection contre la réutilisation du lien concernant le changement de mot de passe (ca repasse a unvalidate si le lien est utilisé ou le user se connecte)
      await User.updateOne(
        { _id: user._id },
        { $set: { tokenRestPassword: "validate" } }
      );
      // generer un token si le process est valaide
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );

      const resetLink = `${process.env.FRONTEND_URL}/changement-mot-de-passe/${token}`;

      // envoyer le mail de modification de compte
      resetPasswordSendLink(user.email, resetLink);

      res.status(200).json({
        message:
          "Vous recevrez dans quelque minutes un e-mail contenant un lien pour réinitialiser votre mot de passe. Veuillez vérifier votre boîte de réception, y compris les courriers indésirable",
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Reset password validate
  resetPasswordValidate: async (req, res) => {
    try {
      const { error } = validateNewPassword(req.body);

      if (error) {
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }
      let user = await User.findOne({ _id: req.user.id });

      // vérifier si le user existe
      if (!user) {
        return handleErrors(res, 404, {
          message: "Veuillez vous connecter",
        });
      }

      if (user.tokenRestPassword === "unvalidate") {
        return handleErrors(res, 403, {
          message: "Le lien n'est plus valide",
        });
      }

      // hacher le nouveau mot de passe avant de l'enregistrer
      const salt = await bcrypt.genSalt(10);
      const newPassword = (req.body.password = await bcrypt.hash(
        req.body.password.trim(),
        salt
      ));

      // modifier le mot de passe et désactiver la possibilité de réutilisation du lien
      await User.updateOne(
        { _id: user._id },
        {
          $set: { password: newPassword, tokenRestPassword: "unvalidate" },
        }
      );

      // envoyer le mail de modification de compte
      validationNewPassword(user.email);

      res.status(200).json({
        message: "Votre mot de passe a bien été modifié",
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
