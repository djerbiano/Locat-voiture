const mongoose = require("mongoose");
const joi = require("joi");
const { User } = require("./Users");
const { Car } = require("./Cars");

const BookingsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voiture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    departAgence: {
      type: String,
      enum: [
        "Agence-de-paris",
        "Agence-de-nantes",
        "Agence-de-lyon",
        "Agence-de-marseille",
        "Agence-de-bordeaux",
      ],
    },
    retourAgence: {
      type: String,
      enum: [
        "Agence-de-paris",
        "Agence-de-nantes",
        "Agence-de-lyon",
        "Agence-de-marseille",
        "Agence-de-bordeaux",
      ],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["En-attente", "acceptée", "refusée", "annulée", "terminée"],
      default: "En-attente",
    },

    dateOfReservation: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        content: {
          type: String,
        },
        dateOfComment: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    deleteWithUser: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingsSchema);

// validate booking
function validateBooking(obj) {
  const schema = joi.object({
    user: joi.string().required(),
    voiture: joi.string().required(),
    departAgence: joi
      .string()
      .valid(
        "Agence-de-paris",
        "Agence-de-nantes",
        "Agence-de-lyon",
        "Agence-de-marseille",
        "Agence-de-bordeaux"
      )
      .required(),
    retourAgence: joi
      .string()
      .valid(
        "Agence-de-paris",
        "Agence-de-nantes",
        "Agence-de-lyon",
        "Agence-de-marseille",
        "Agence-de-bordeaux"
      )
      .required(),
    endDate: joi.date().required().greater("now"),
    startDate: joi.date().required().greater("now").less(joi.ref("endDate")),
    price: joi.number().positive().required().min(1).max(15500), // max 31day (500max per day)
    status: joi
      .string()
      .valid("En-attente", "acceptée", "refusée", "annulée")
      .required(),
    dateOfReservation: joi.date().default(() => new Date()),
    deleteWithUser: joi.boolean().default(true),
  });

  return schema.validate(obj);
}

// validate booking comments
function validateBookingComments(obj) {
  const schema = joi.object({
    user: joi.string().required(),
    content: joi.string().required().min(2).max(150),
    dateOfComment: joi.date().default("now"),
  });

  return schema.validate(obj);
}

//updateBookingWithAdmin
function updateBookingWithAdmin(obj) {
  const schema = joi.object({
    status: joi
      .string()
      .valid("En-attente", "acceptée", "refusée", "annulée", "terminée"),
    deleteWithUser: joi.boolean().default(true),
  });

  return schema.validate(obj);
}

// booking available for user

function bookingAvailableForUser(obj) {
  const schema = joi.object({
    departAgence: joi
      .string()
      .valid(
        "Agence-de-paris",
        "Agence-de-nantes",
        "Agence-de-lyon",
        "Agence-de-marseille",
        "Agence-de-bordeaux"
      )
      .required(),
    retourAgence: joi
      .string()
      .valid(
        "Agence-de-paris",
        "Agence-de-nantes",
        "Agence-de-lyon",
        "Agence-de-marseille",
        "Agence-de-bordeaux"
      )
      .required(),
    endDate: joi.date().required().greater("now"),
    startDate: joi.date().required().greater("now").less(joi.ref("endDate")),
    place: joi.number().required().min(1).max(7),
  });

  return schema.validate(obj);
}

module.exports = {
  Booking,
  validateBooking,
  validateBookingComments,
  updateBookingWithAdmin,
  bookingAvailableForUser,
};
