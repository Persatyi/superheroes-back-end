const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public");

const removeById = async (req, res) => {
  const { heroId } = req.params;
  const result = await Hero.findByIdAndRemove(heroId);

  if (!result) {
    throw createError(404, "Hero not found");
  }

  // Removing pictures from public folder
  const { images } = result;
  for (let i = 0; i < images.length; i += 1) {
    const file = path.join(avatarsDir, images[i].path);
    fs.unlink(file);
  }

  res.json({ message: "Hero removed" });
};

module.exports = removeById;
