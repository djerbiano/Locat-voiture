const express = require("express");
const controller = require("../controllers/userController");
const virifyToken = require("../middlewares/virifyToken");
const route = express.Router();

// Register user
route.post("/register", controller.registerUser);

// Login user
route.post("/login", controller.loginUser);

// Update user
route.patch("/update/:email", virifyToken, controller.updateUser);


module.exports = route;