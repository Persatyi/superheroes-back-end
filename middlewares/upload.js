const multer = require("multer");
const path = require("path");

const pathDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {},
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
