const mongoose = require("mongoose");
const joi = require("joi");
const { Booking } = require("./Bookings");

const CarsSchema = mongoose.Schema(
  {
    marque: {
      type: String,
      required: true,
    },
    modele: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },

    place: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },

    doors: {
      type: Number,
      required: true,
      min: 2,
      max: 5,
      default: 4,
    },

    transmission: {
      type: String,
      required: true,
      enum: ["automatique", "manuelle"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Économique", "Intermédiaire", "Premium"],
    },
    fuel: {
      type: String,
      required: true,
      enum: ["Essence", "Diesel", "Electrique"],
    },
    pictures: {
      pic1: {
        type: String,
        default: "avatarDefault.gif",
        required: true,
      },
      pic2: {
        type: String,
        default: "avatarDefault.gif",
        required: true,
      },
      pic3: {
        type: String,
        default: "avatarDefault.gif",
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    stockOfCar: {
      type: Number,
      default: 1,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },

    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", CarsSchema);

// validate car
function validateCar(obj) {
  const schema = joi.object({
    marque: joi.string().required(),
    modele: joi.string().required(),
    color: joi.string().required(),
    place: joi.number().required().min(1).max(7),
    doors: joi.number().required().min(2).max(5),
    transmission: joi.string().required().valid("automatique", "manuelle"),
    category: joi
      .string()
      .required()
      .valid("Économique", "Intermédiaire", "Premium"),
    fuel: joi.string().required().valid("Essence", "Diesel", "Electrique"),
    pictures: joi
      .object({
        pic1: joi.string(),
        pic2: joi.string(),
        pic3: joi.string(),
      }), 
    description: joi.string().required(),
    pricePerDay: joi.number().required(),
    stockOfCar: joi.number().required(),
    available: joi.boolean().required(),
  });

  return schema.validate(obj);
}

// update car
function updateCar(obj) {
  const schema = joi.object({
    marque: joi.string().min(2),
    modele: joi.string().min(2),
    color: joi.string().min(2),
    place: joi.number().min(1).max(7),
    doors: joi.number().min(2).max(5),
    transmission: joi.string().valid("automatique", "manuelle"),
    category: joi.string().valid("Économique", "Intermédiaire", "Premium"),
    fuel: joi.string().valid("Essence", "Diesel", "Electrique"),
    pictures: joi.object({
      pic1: joi.string(),
      pic2: joi.string(),
      pic3: joi.string(),
    }),
    description: joi.string().min(10),
    pricePerDay: joi.number().min(1),
    stockOfCar: joi.number(),
    available: joi.boolean(),
  });

  return schema.validate(obj);
}
module.exports = {
  Car,
  validateCar,
  updateCar,
};
