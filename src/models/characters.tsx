import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  coords: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  image_url: { type: String, required: true },
});

const CharacterModel = mongoose.model("Character", CharacterSchema);
export default CharacterModel;
