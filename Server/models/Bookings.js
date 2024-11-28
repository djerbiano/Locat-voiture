const mongoose = require("mongoose");
const joi = require("joi");
const Users = require("./Users");
const Cars = require("./Cars");

const BookingsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    voiture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cars",
      required: true,
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
      enum: ["En-attente", "acceptée", "refusée", "annulée"],
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
    updateWithUser: {
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
    startDate: joi.date().required().greater('now'),
    endDate: joi.date().greater(joi.ref("startDate")).greater('now').required(),
    price: joi.number().positive().required().min(1).max(15500), // max 31day (500max per day)
    status: joi.string().valid("En-attente", "acceptée", "refusée", "annulée").required(),
  });

  return schema.validate(obj);
}

// validate booking comments
function validateBookingComments(obj) {
  const schema = joi.object({
    user: joi.string().required(),
    content: joi.string().required().min(2).max(150),
    dateOfComment: joi.date().default('now'),
  });

  return schema.validate(obj);
}

module.exports = { Booking, validateBooking , validateBookingComments};
