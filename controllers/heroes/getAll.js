const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers");

const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Hero.find({}, "-__v", {
    skip,
    limit: Number(limit),
  });

  if (result.length === 0) {
    throw createError(404);
  }

  res.json(result);
};

module.exports = getAll;
