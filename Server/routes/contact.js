const express = require("express");
const controller = require("../controllers/contactController");
const route = express.Router();

// Contact (user send message without compte from contact page)
route.post("/sendMessage", controller.contact);

module.exports = route;