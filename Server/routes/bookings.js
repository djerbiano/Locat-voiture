const express = require("express");
const controller = require("../controllers/bookingsController");
const virifyToken = require("../middlewares/virifyToken");
const isAdmin = require("../middlewares/isAdmin");
const route = express.Router();


// booking available for user
route.post("/bookingAvailable", controller.bookingAvailable);

// registerBooking
route.post("/registerBooking", virifyToken, controller.registerBooking);

// DeleteBooking
route.delete("/deleteBooking/:id", virifyToken, controller.deleteBooking);

// Get all Bookings for user
route.get("/allBookings", virifyToken, controller.getAllBookingsForUser);

// Get Booking by id for user
route.get("/:id", virifyToken, controller.getBookingById);

// cancelBooking by user before 48 hours
route.patch("/cancelBooking/:id", virifyToken, controller.cancelBooking);



module.exports = route;
