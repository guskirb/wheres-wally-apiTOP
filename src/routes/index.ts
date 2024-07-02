import { Router } from "express";
const router = Router();

import characterController from "../controllers/characterControllers.js";
import scoreController from "../controllers/scoreController.js";

// GET characters
router.get("/characters", characterController.get_characters);

// POST new character
router.post("/characters", characterController.create_character);

// GET scores
router.get("/scores", scoreController.get_scores);

// POST new score
router.post("/score/start", scoreController.score_start);

// UPDATE score
router.post("/score/:id/end", scoreController.score_end);

export default router;
