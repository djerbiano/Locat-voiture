const mongoose = require("mongoose");
const { Car, validateCar, updateCar } = require("../models/Cars");
const { User } = require("../models/Users");
const { Booking } = require("../models/Bookings");
const { handleErrors, deleteImage } = require("../utils/helpers");

const controller = {
  // registerCar
  registerCar: async (req, res) => {
    try {
      // validation de la data
      if (!req.file) {
        return handleErrors(res, 400, {
          message: "L'image est obligatoire",
        });
      }
      const { error } = validateCar(req.body);
      if (error) {
        // supprimer l'image si error detecté
        deleteImage(req.file.filename);
        return handleErrors(res, 400, {
          message: error.details[0].message,
        });
      }

      const car = new Car({
        ...req.body,
        pictures: {
          pic1: req.file.filename,
        },
      });

      await car.save();

      return res.status(200).json({
        message: "Voiture ajoutée",
      });
    } catch (error) {
      console.log(error.message);
      if (req.file) {
        deleteImage(req.file.filename);
      }
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

      // supprimer l'image
      deleteImage(car.pictures.pic1);

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
      const cars = await Car.find({ available: true })
        .select("-bookings -__v")
        .sort({ createdAt: -1 });

      /* a supp */

      // await Car.updateMany({"available": false}, {$set: {"available": true}});

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
      const cars = await Car.find({})
        .populate({ path: "bookings" })
        .sort({ marque: 1 });

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

  // getCarById for admin with bookings
  getCarByIdForAdmin: async (req, res) => {
    try {
      // vérifier si l'ID de la voiture est valide
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return handleErrors(res, 400, {
          message: "ID de voiture invalide",
        });
      }

      // Vérifier si la voiture existe
      const car = await Car.findById(req.params.id).populate({
        path: "bookings",
      });

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
