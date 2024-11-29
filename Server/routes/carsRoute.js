const express = require("express");
const controller = require("../controllers/carsController");
const virifyToken = require("../middlewares/virifyToken");
const isAdmin = require("../middlewares/isAdmin");
const route = express.Router();

// Add car
route.post("/register", virifyToken, isAdmin, controller.registerCar);

// Update car
route.patch("/update/:id", virifyToken, isAdmin, controller.updateCar);

// Delete car
route.delete("/delete/:id", virifyToken, isAdmin, controller.deleteCar);

// Get all cars for user
route.get("/all", controller.getAllCars);

// Get car by id for user
route.get("/:id", controller.getCarById);



/*** for admin ***/

// Get all cars for admin with bookings
route.get("/admin/all", virifyToken, isAdmin, controller.getAllCarsForAdmin);

// Get car by id for admin with bookings
route.get("/admin/:id", virifyToken, isAdmin, controller.getCarByIdForAdmin);

module.exports = route;
