import asyncHandler from "express-async-handler";

import Score from "../models/scores.js";

const scoreController = (() => {
  const get_scores = asyncHandler(async (req, res) => {
    try {
      if (req.query.difficulty) {
        // If request query present search DB by query
        const scores = await Score.find({
          difficulty: {
            $regex: new RegExp(req.query.difficulty as string, "i"),
          },
          end: {
            $exists: true,
          },
        }).exec();

        res.status(200).json({
          success: true,
          scores: scores,
        });
        return;
      } else {
        // Else fetch all characters in DB
        const scores = await Score.find({
          end: {
            $exists: true,
          },
        }).exec();

        res.status(200).json({
          success: true,
          scores: scores,
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

  const score_start = asyncHandler(async (req, res) => {
    try {
      const newScore = new Score({
        start: new Date(),
        difficulty: req.body.difficulty,
      });

      const score = await newScore.save();
      res.status(201).json({
        success: true,
        score: score,
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

  const score_end = asyncHandler(async (req, res) => {
    try {
      const updatedScore = new Score({
        end: new Date(),
        _id: req.params.id,
      });

      const score = await Score.findByIdAndUpdate(
        req.params.id,
        updatedScore,
        {}
      );
      res.status(200).json({
        success: true,
        score: score,
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

  const edit_name = asyncHandler(async (req, res) => {
    try {
      let result: any = {
        success: true,
      };
      if (req.body.name !== "") {
        const updatedScore = new Score({
          name: req.body.name,
          _id: req.params.id,
        });

        const score = await Score.findByIdAndUpdate(
          req.params.id,
          updatedScore,
          {}
        );

        result.score = score;
      } else {
        const updatedScore = new Score({
          name: "Anonymous",
          _id: req.params.id,
        });

        const score = await Score.findByIdAndUpdate(
          req.params.id,
          updatedScore,
          {}
        );

        result.score = score;
      }

      res.status(200).json(result);
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
    get_scores,
    score_start,
    score_end,
    edit_name,
  };
})();

export default scoreController;
