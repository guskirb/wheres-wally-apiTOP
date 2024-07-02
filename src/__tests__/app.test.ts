import indexRouter from "../routes/index.js";

import request from "supertest";
import express from "express";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

describe("GET /characters", () => {
  test("characters route works", () => {
    request(app)
      .get("/characters")
      .expect("Content-Type", /json/)
      .expect({ success: true })
      .expect(200);
  });

  test("characters difficulty route works", () => {
    request(app)
      .get("/characters?difficulty=easy")
      .expect("Content-Type", /json/)
      .expect({ success: true })
      .expect(200);
  });
});

describe("GET /scores", () => {
  test("scores route works", () => {
    request(app)
      .get("/scores")
      .expect("Content-Type", /json/)
      .expect({ success: true })
      .expect(200);
  });

  test("new score route works", () => {
    request(app)
      .post("/scores/start")
      .expect("Content-Type", /json/)
      .expect({ success: true })
      .expect(200);
  });
});
