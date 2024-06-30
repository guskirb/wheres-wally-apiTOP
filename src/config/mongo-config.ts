import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
