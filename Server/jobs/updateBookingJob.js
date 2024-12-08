const cron = require('node-cron');
const { updateBookingStatuses } = require("../services/bookingService");

//planifier la mise à jour des statuts des réservations chaque jour à minuit
cron.schedule('0 0 * * *', () => {
  console.log('Exécution de la tâche pour mettre à jour les statuts des réservations. Chaque jour à minuit');
  updateBookingStatuses();
});

//exécuter immédiatement la mise à jour lors du démarrage
async function runImmediateUpdate() {
  console.log('Exécution immédiate de la mise à jour des statuts des réservations au démarrage du serveur');
  await updateBookingStatuses();
}

module.exports = {
  runImmediateUpdate,
};
 