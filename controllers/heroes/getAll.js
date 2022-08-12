const { Hero } = require("../../models/hero");

const getAll = async (req, res) => {
  // const { _id: owner } = req.user;
  //   const { page = 1, limit = 5 } = req.query;
  //   const skip = (page - 1) * limit;
  const result = await Hero.find({});
  res.json(result);
};

module.exports = getAll;
