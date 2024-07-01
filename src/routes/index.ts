import { Router } from "express";
const router = Router();

import characterController from "../controllers/characterControllers.js";

// GET characters
router.get("/characters", characterController.get_characters);

// POST new character
router.post("/characters", characterController.create_character);

export default router;
