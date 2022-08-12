const express = require("express");
const { heroes: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models/hero");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.post("/", validation(schemas.joiHero), ctrlWrapper(ctrl.add));

module.exports = router;
