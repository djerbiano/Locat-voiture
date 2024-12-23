const express = require("express");
const controller = require("../controllers/contactController");
const route = express.Router();

// Register user
route.post("/sendMessage", controller.contact);

module.exports = route;