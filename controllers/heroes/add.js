const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const add = async (req, res) => {
  const { nickname } = req.body;
  const findNickname = await Hero.findOne({ nickname });

  const filesPath = req.files.map((file) => {
    return { path: file.path, name: file.filename };
  });

  if (findNickname) {
    for (let i = 0; i < filesPath.length; i += 1) {
      fs.unlink(filesPath[i].path);
    }
    throw createError(409, "Nickname is exist");
  }

  const images = [];
  for (let i = 0; i < filesPath.length; i += 1) {
    try {
      const image = path.join("avatars", filesPath[i].name);
      images.push(image);
      const newDir = path.join(avatarsDir, filesPath[i].name);
      fs.rename(filesPath[i].path, newDir);
    } catch (error) {
      if (error.message.includes("no such file or directory")) {
        await fs.unlink(filesPath[i].path);
      }
    }
  }

  const result = await Hero.create({ ...req.body, images });
  res.status(201).json(result);
};

module.exports = add;
