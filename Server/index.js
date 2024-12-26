const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const errMiddleware = require("./middlewares/errMiddleware");
const connectToDb = require("./config/db");
const verifSessionStorage = require("./routes/privateRoute");
const authRoute = require("./routes/authRoute");
const carsRoute = require("./routes/carsRoute");
const bookingsRoute = require("./routes/bookings");
const bookingAdminRoute = require("./routes/bookingAdmin");
const userAdminRoute = require("./routes/userAdmin");
const contactRoute = require("./routes/contact");

const port = process.env.PORT || 3002;
const server = express();
server.use(cors());
server.use(express.json());

// Middleware pour analyser les données URL encodées des formulaires
server.use(express.urlencoded({ extended: true }));

server.use("/images", express.static("images"));

// Connexion à la database et exécuter la mise à jour des statuts des réservations immédiate au démarrage du serveur (voir dossier jobs et services)
connectToDb();

// Middleware pour enregistrer les informations de la requête
server.use(logger);

// Routes
server.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "API ok" });
    //return res.status(200).json({ message: "No access API" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});
server.use("/api/auth", authRoute);
server.use("/api", verifSessionStorage);
server.use("/cars", carsRoute);
server.use("/bookings", bookingsRoute);
server.use("/admin/bookings", bookingAdminRoute);
server.use("/admin/users", userAdminRoute);
server.use("/contact", contactRoute);

server.all("*", (req, res) => {
  res.status(404).send("<h1>Endpoint inexistant</h1>");
});

// Middleware pour gérer les erreurs
server.use(errMiddleware);

// Démarrer le serveur
server.listen(port, () => console.log(`Server listening on port ${port}`));
