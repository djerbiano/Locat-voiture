const express = require("express");
const controller = require("../controllers/userController");
const virifyToken = require("../middlewares/virifyToken");
const route = express.Router();

// Register user
route.post("/register", controller.registerUser);

// Get user
route.get("/user/:idUser", virifyToken, controller.getUser);

// Login user
route.post("/login", controller.loginUser);

// Update user
route.patch("/update/:email", virifyToken, controller.updateUser);

// Delete user
route.delete("/delete/:email", virifyToken, controller.deleteUser);

// Renistialize password link for user
route.post("/reset-password-send-link/:email", controller.resetPasswordSendLink);

// Reset password validate
route.post("/reset-password-validate/:token", virifyToken, controller.resetPasswordValidate);

module.exports = route;
