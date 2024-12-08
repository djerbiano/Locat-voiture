const express = require("express");
const controller = require("../controllers/bookingControllerAdmin");
const virifyToken = require("../middlewares/virifyToken");
const isAdmin = require("../middlewares/isAdmin");
const route = express.Router();

// PatchBooking
route.patch("/updateBooking/:id", virifyToken, isAdmin, controller.updateBooking);

// Get all Bookings for admin
route.get("/allBookings", virifyToken, isAdmin, controller.getAllBookingsForAdmin);

// Get Booking by id for admin
route.get("/:id", virifyToken, isAdmin, controller.getBookingByIdForAdmin);


module.exports = route;