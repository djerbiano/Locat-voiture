const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3002;
const logger = require("./middlewares/logger");
const errMiddleware = require("./middlewares/errMiddleware");
const connectToDb = require("./config/db");

const authRoute = require("./routes/authRoute");

const server = express();
server.use(cors());
server.use(express.json());
server.use("/images", express.static("images"));

// Middleware pour analyser les données URL encodées des formulaires
server.use(express.urlencoded({ extended: true }));

// Connect to the database
connectToDb();

// Middleware pour enregistrer les informations de la requête
server.use(logger);

// Routes
server.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "No access API" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});
server.use("/api/auth", authRoute);
server.all("*", (req, res) => {
  res.status(404).send("<h1>Endpoint inexistant</h1>");
});

// Middleware pour gérer les erreurs
server.use(errMiddleware);

// Démarrer le serveur
server.listen(port, () => console.log(`Server listening on port ${port}`));
