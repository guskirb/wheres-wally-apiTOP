import indexRouter from "../routes/index.js";

import request from "supertest";
import express from "express";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

test("characters route works", () => {
  request(app)
    .get("/characters")
    .expect("Content-Type", /json/)
    .expect({ success: true })
    .expect(200);
});

test("scores route works", () => {
  request(app)
    .get("/scores")
    .expect("Content-Type", /json/)
    .expect({ success: true })
    .expect(200);
});
