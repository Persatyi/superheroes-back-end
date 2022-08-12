const { Hero } = require("../../models/hero");

const add = async (req, res) => {
  //   const { _id: owner } = req.body;
  const result = await Hero.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = add;
