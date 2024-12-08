const { Booking } = require("../models/Bookings");

// mettre à jour les statuts des réservations
async function updateBookingStatuses() {
  try {
    const today = new Date();
    const result = await Booking.updateMany(
      { endDate: { $lt: today }, status: { $ne: "terminée" } },
      { status: "terminée" }
    );
    console.log(
      `Mise à jour effectuée : ${result.modifiedCount} réservations ont été mises à jour.`
    );
  } catch (err) {
    console.error("Erreur lors de la mise à jour des réservations :", err);
  }
}

module.exports = {
  updateBookingStatuses,
};
