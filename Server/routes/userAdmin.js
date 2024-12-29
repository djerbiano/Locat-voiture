const express = require("express");
const controller = require("../controllers/userControllerAdmin");
const virifyToken = require("../middlewares/virifyToken");
const isAdmin = require("../middlewares/isAdmin");
const route = express.Router();

// PatchUser
route.patch("/updateUser/:idUser", virifyToken, isAdmin, controller.updateUser);

// Get all users
route.get("/allUsers", virifyToken, isAdmin, controller.getAllUsers);

// delete user
route.delete("/deleteUser/:idUser", virifyToken, isAdmin, controller.deleteUser);

// Get user by id
route.get("/oneUser/:idUser", virifyToken, isAdmin, controller.getUserById);

module.exports = route;
