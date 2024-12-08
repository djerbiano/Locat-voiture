const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const updateBookingJob = require("../jobs/updateBookingJob");

const url = process.env.URL_DB_ENLIGNE;
const dbName = process.env.DB_NAME;

const connectToDb = async () => {
  try {
    await mongoose.connect(`${url}/${dbName}`);
    console.log(`connected to the ${dbName} database`);

    // Exécutez la mise à jour des statuts des réservations immédiate au démarrage
    await updateBookingJob.runImmediateUpdate();
    
  } catch (error) {
    console.log(`Connection DB error : ${error}`);
  }
};

module.exports = connectToDb;
