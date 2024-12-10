const mongoose = require("mongoose");
const joi = require("joi");
const Bookings = require("./Bookings");

const UsersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "avatarDefault.jpg",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
    tokenRestPassword: {
      type: String,
      enum: ["validate", "unvalidate"],
      default: "unvalidate",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UsersSchema);

// validate Register user
function validateRegisterUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email().messages({
      "string.min": "L'email doit avoir au moins 5 caractères.",
      "string.max": "L'email ne doit pas avoir plus de 100 caractères.",
      "string.email": "L'email doit avoir un format valide.",
    }),
    password: joi.string().trim().min(6).required().messages({
      "string.min": "Le mot de passe doit avoir au moins 6 caractères.",
    }),
    name: joi.string().trim().min(4).max(100).messages({
      "string.min": "Le nom et prénom doivent avoir au moins 4 caractères.",
      "string.max": "Le nom et prénom doivent avoir au moins 4 caractères.",
    }),
    lastName: joi.string().trim().min(4).max(100).messages({
      "string.min": "Le nom et prénom doivent avoir au moins 4 caractères.",
      "string.max": "Le nom et prénom doivent avoir au moins 4 caractères.",
    }),
    phone: joi
      .string()
      .trim()
      .pattern(/^\+?[0-9]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Le numéro de téléphone doit contenir entre 10 et 15 chiffres et peut commencer par un '+'.",
      }),
    address: joi.string().trim().min(5).max(100).messages({
      "string.min": "L'adresse doit avoir au moins 5 caractères.",
      "string.max": "L'adresse ne doit pas avoir plus de 100 caractères.",
    }),
  });
  return schema.validate(obj);
}
// validate new email
function validateNewMail(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).email().messages({
      "string.min": "L'email doit avoir au moins 5 caractères.",
      "string.max": "L'email ne doit pas avoir plus de 100 caractères.",
      "string.email": "L'email doit avoir un format valide.",
    }),
  });
  return schema.validate(obj);
}
// validate new password
function validateNewPassword(obj) {
  const schema = joi.object({
    password: joi.string().trim().min(6).messages({
      "string.min": "Le mot de passe doit avoir au moins 6 caractères.",
    }),
  });
  return schema.validate(obj);
}

// validate login user
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email().messages({
      "string.min": "L'email doit avoir au moins 5 caractères.",
      "string.max": "L'email ne doit pas avoir plus de 100 caractères.",
      "string.email": "L'email doit avoir un format valide.",
    }),
    password: joi.string().trim().min(6).required().messages({
      "string.min": "Le mot de passe doit avoir au moins 6 caractères.",
    }),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateNewPassword,
  validateNewMail,
  validateLoginUser,
};
