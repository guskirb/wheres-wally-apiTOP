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
router.post("/scores", scoreController.create_score);

// UPDATE score
router.post("/scores/:id/update", scoreController.update_score);

export default router;
