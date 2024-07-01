import asyncHandler from "express-async-handler";

import Character from "../models/characters.js";

const characterController = (() => {
  const get_characters = asyncHandler(async (req, res) => {
    try {
      if (req.query.difficulty) {
        // If request query present search DB by query
        const characters = await Character.find({
          difficulty: {
            $regex: new RegExp(req.query.difficulty as string, "i"),
          },
        }).exec();

        res.status(200).json({
          success: true,
          characters: characters,
        });
        return;
      } else {
        // Else fetch all characters in DB
        const characters = await Character.find().exec();

        res.status(200).json({
          success: true,
          characters: characters,
        });
        return;
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
      return;
    }
  });

  const create_character = asyncHandler(async (req, res) => {
    try {
      const newCharacter = new Character({
        name: req.body.name,
        coords: {
            x: req.body.x,
            y: req.body.y,
        },
        difficulty: req.body.difficulty,
      });

      const character = await newCharacter.save();
      res.status(201).json({
        success: true,
        character: character,
      });
      return;
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
      return;
    }
  });

  return {
    get_characters,
    create_character,
  };
})();

export default characterController;
