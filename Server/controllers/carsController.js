const mongoose = require("mongoose");
const { Car, validateCar, updateCar } = require("../models/Cars");
const { User } = require("../models/Users");
const { handleErrors } = require("../utils/helpers");

const controller = {
  // registerCar
  registerCar: async (req, res) => {
    try {
      // validation de la data
      const { error } = validateCar(req.body);
      if (error) {
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }

      const car = new Car(req.body);
      await car.save();

      return res.status(200).json({
        message: "Voiture ajoutée",
      });
    } catch (error) {
      console.log(error.message);
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // updateCar
  updateCar: async (req, res) => {
    try {
      // validation de la data
      const { error } = updateCar(req.body);
      if (error) {
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }

      // minimum un champs a modifier
      if (Object.keys(req.body).length === 0) {
        return handleErrors(res, 400, {
          message: "Veuillez renseigner au moins un champ",
        });
      }

      // vérifier si l'ID de la voiture est valide
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return handleErrors(res, 400, {
          message: "ID de voiture invalide",
        });
      }

      // Vérifier si la voiture existe
      const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!car) {
        return handleErrors(res, 404, {
          message: "Voiture non trouvée",
        });
      }

      return res.status(200).json({
        message: "Voiture mise à jour",
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // deleteCar
  deleteCar: async (req, res) => {
    try {
      // vérifier si l'ID de la voiture est valide
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return handleErrors(res, 400, {
          message: "ID de voiture invalide",
        });
      }

      // Vérifier si la voiture existe
      const car = await Car.findByIdAndDelete(req.params.id);

      if (!car) {
        return handleErrors(res, 404, {
          message: "Voiture non trouvée",
        });
      }

      return res.status(200).json({
        message: "Voiture supprimée",
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // getAllCars for user
  getAllCars: async (req, res) => {
    try {
      const cars = await Car.find({ available: true }).select("-bookings -__v");

      if (cars.length < 1) {
        return res.status(200).json({
          cars,
          message: "Aucune voiture dans la base des données",
        });
      }

      return res.status(200).json({
        cars,
        Total: cars.length,
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // getAllCars for admin with bookings
  getAllCarsForAdmin: async (req, res) => {
    try {
      const cars = await Car.find({});

      if (cars.length < 1) {
        return res.status(200).json({
          cars,
          message: "Aucune voiture dans la base des données",
        });
      }

      return res.status(200).json({
        cars,
        Total: cars.length,
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // getCarById
  getCarById: async (req, res) => {
    try {
      // vérifier si l'ID de la voiture est valide
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return handleErrors(res, 400, {
          message: "ID de voiture invalide",
        });
      }

      // Vérifier si la voiture existe
      const car = await Car.findById(req.params.id).select("-bookings -__v");

      if (!car) {
        return handleErrors(res, 404, {
          message: "Voiture non trouvée",
        });
      }

      return res.status(200).json({
        car,
      });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
