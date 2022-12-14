const { Schema, model } = require("mongoose");
const Joi = require("joi");

const heroSchema = Schema({
  nickname: {
    type: String,
    required: [true, "Nickname is required"],
    unique: true,
  },
  realName: {
    type: String,
    required: [true, "Real name is required"],
  },
  originDescription: {
    type: String,
    default: "None",
  },
  superpowers: {
    type: String,
    required: [true, "Superpowers is required"],
  },
  catchPhrase: {
    type: String,
    default: "None",
  },
  images: {
    type: Array,
  },
});

const Hero = model("hero", heroSchema);

const joiHero = Joi.object({
  nickname: Joi.string().required(),
  realName: Joi.string().required(),
  originDescription: Joi.string().required(),
  superpowers: Joi.string().required(),
  catchPhrase: Joi.string().required(),
  images: Joi.alternatives().try(
    Joi.array().default([]),
    Joi.string().empty(null).allow(null, "").default(""),
    Joi.object()
  ),
});

const editHeroImage = Joi.object({
  image: Joi.alternatives().try(
    Joi.array().default([]),
    Joi.string().empty(null).allow(null, "").default(""),
    Joi.object()
  ),
});

const schemas = {
  joiHero,
  editHeroImage,
};

module.exports = { Hero, schemas };
