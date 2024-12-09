const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const controller = {
  verifInformationSessionStorage: async (req, res) => {
    const { token, userid } = req.headers;

    // Vérifier si le token est présent
    if (!token) {
      return res.status(401).json({ message: "false" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Vérifier que l'id décodé correspond à l'id dans les en-têtes
      if (decoded.id !== userid) {
        return res.status(403).json({ message: "false" });
      }

      // Ajouter les infos utilisateur à la requête
      req.user = decoded;

      return res.status(200).json({ message: "true" });
    } catch (error) {
      return res.status(401).json({
        message: "false",
        error: error.message,
      });
    }
  },
};

module.exports = controller;
