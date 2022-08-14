const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const app = require("../app");
const { Hero } = require("../models/hero");

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test add hero function", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(TEST_DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection("foo", () => {
      mongoose.connection.close(() => done());
    });
  });

  test("test add route", async () => {
    const reqData = {
      nickname: "Superman",
      realName: "Clark Kent",
      originDescription:
        " he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction",
      superpowers:
        "solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, fligh",
      catchPhrase:
        "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
      images: [],
    };
    const response = await request(app).post("/api/heroes").send(reqData);
    expect(response.statusCode).toBe(201);
    // const [hero] = await Hero.findById();
  });
});
