const multer = require("multer");

const mimeTypes = {
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/bmp": ".bmp",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Vérifier si le type MIME est accepté
    if (mimeTypes[file.mimetype]) {
      cb(null, "images");
    } else {
      cb(new Error("Type de fichier non pris en charge"), null);
    }
  },
  filename: function (req, file, cb) {
    const ext = mimeTypes[file.mimetype];
    const name = file.originalname.split(".")[0].split(" ").join("_");
    cb(null, `${name}${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage }).single("image");

module.exports = upload;
