const express = require("express");
const controller = require("../controllers/bookingsController");
const virifyToken = require("../middlewares/virifyToken");
const isAdmin = require("../middlewares/isAdmin");
const route = express.Router();

// registerBooking
route.post("/registerBooking", virifyToken, controller.registerBooking);

// DeleteBooking
route.delete("/deleteBooking/:id", virifyToken, controller.deleteBooking);

// Get all Bookings for user
route.get("/allBookings", controller.getAllBookingsForUser);

// Get Booking by id
route.get("/:id", controller.getBookingById);



/*** for admin ***/

// Get all Bookings for admin
route.get("/admin/allBookings", virifyToken, isAdmin, controller.getAllBookingsForAdmin);

// UpdateBooking with admin
route.patch("/updateBooking/:id", virifyToken, isAdmin, controller.updateBooking);

module.exports = route;
