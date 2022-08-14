const { Hero } = require("../../models/hero");

const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const publicDir = path.join(__dirname, "../../", "public", "avatars");

const addPicture = async (req, res) => {
  try {
    const { heroId } = req.params;
    const [hero] = await Hero.find({ _id: heroId });

    const { filename } = req.file;
    const [extension] = filename.split(".").reverse();
    const name = `${uuidv4()}.${extension}`;
    const newDir = path.join(publicDir, name);
    await fs.rename(req.file.path, newDir);

    const avatarURL = path.join("avatars", name);
    const images = hero.images.slice(0, hero.images.length);
    images.push(avatarURL);
    const result = await Hero.findByIdAndUpdate(
      heroId,
      { images },
      { new: true }
    );

    res.status(200).json({
      result,
    });
  } catch (error) {
    if (error.message.includes("no such file or directory")) {
      await fs.unlink(req.file.path);
    }
    throw error;
  }
};

module.exports = addPicture;
