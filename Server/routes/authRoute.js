const express = require("express");
const controller = require("../controllers/userController");
const route = express.Router();

// Register user
route.get("/register", controller.registerUser);


module.exports = route;