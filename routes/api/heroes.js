const express = require("express");
const { heroes: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, upload } = require("../../middlewares");
const { schemas } = require("../../models/hero");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.post(
  "/",
  upload.array("images", 10),
  validation(schemas.joiHero),
  ctrlWrapper(ctrl.add)
);

module.exports = router;
