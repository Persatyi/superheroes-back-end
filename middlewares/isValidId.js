const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { heroId } = req.params;

  if (!isValidObjectId(heroId)) {
    next(createError(400, "Not valid id"));
  }
  next();
};

module.exports = isValidId;
