const { User } = require("../models/Users");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

// Fonction pour supprimer une image
const deleteImage = (filename) => {
  const picture = path.resolve(__dirname, "../images", filename);
  fs.unlink(picture, (err) => {
    if (err) console.log(err);
  });
};

// Fonction pour gérer les erreurs 
const handleErrors = (res, statusCode, message) => {
  return res.status(statusCode).json(message);
};

// Fonction pour vérifier si l'id est valide pour limiter les requettes inutiles vers la base de données
const verifiyIdMongoDb = (id) =>{
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = { deleteImage, handleErrors, verifiyIdMongoDb  };
