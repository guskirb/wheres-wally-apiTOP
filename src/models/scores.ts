import mongoose from "mongoose";
import { DateTime } from "luxon";
const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
  {
    name: { type: String, default: "Anonymous" },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    start: { type: Date },
    end: { type: Date },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ScoreSchema.virtual("score").get(function () {
  return DateTime.fromJSDate(this.start!)
    .diff(DateTime.fromJSDate(this.end!), "minutes")
    .toObject();
});

const ScoreModel = mongoose.model("Score", ScoreSchema);
export default ScoreModel;
