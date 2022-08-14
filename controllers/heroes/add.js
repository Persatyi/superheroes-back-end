const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers");

const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Path to "Public" dir;
const publicDir = path.join(__dirname, "../../", "public");

const add = async (req, res) => {
  const { nickname } = req.body;
  const findNickname = await Hero.findOne({ nickname });

  const filesPath = req.files.map((file) => {
    return { path: file.path, name: file.filename };
  });

  if (findNickname) {
    // In the case of nickname is used, removing the files that came into the "Temp" folder
    for (let i = 0; i < filesPath.length; i += 1) {
      fs.unlink(filesPath[i].path);
    }
    throw createError(409, "Nickname is exist");
  }

  // An array of new paths to files;
  const images = [];

  for (let i = 0; i < filesPath.length; i += 1) {
    try {
      // Renaming images by awarding an id;
      const [extension] = filesPath[i].name.split(".").reverse();
      const newImagePath = path.join("avatars", `${uuidv4()}.${extension}`);

      // Pushing new path to array;
      images.push(newImagePath);

      // Moving image from "temp" folder to "public";
      const newDir = path.join(publicDir, newImagePath);
      fs.rename(filesPath[i].path, newDir);
    } catch (error) {
      // In case something wrong removing file from "Temp" folder;
      if (error.message.includes("no such file or directory")) {
        fs.unlink(filesPath[i].path);
      }
    }
  }

  const result = await Hero.create({ ...req.body, images });
  res.status(201).json(result);
};

module.exports = add;
