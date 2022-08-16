const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");

const removePicture = async (req, res) => {
  const { heroId, image } = req.params;
  const [hero] = await Hero.find({ _id: heroId });

  if (!hero) {
    throw createError(400, `Can't found hero with ${heroId} id`);
  }

  const index = hero.images.findIndex((el) => el.name === image);

  if (index === -1) {
    throw createError(404, "Image not found");
  }

  // Removing image from public folder
  const removePath = path.join(__dirname, "../../", "public", "avatars", image);
  await fs.unlink(removePath);

  // Updating DB
  const newArray = hero.images.slice(0, hero.images.length);
  newArray.splice(index, 1);
  const newHero = await Hero.findByIdAndUpdate(
    heroId,
    { images: newArray },
    { new: true }
  );

  res.status(200).json({
    newHero,
  });
};

module.exports = removePicture;
