import express from "express";
import { addTheme, deleteTheme, getOneTheme, getThemes } from "../controllers/theme.js";

const router = express.Router();

router.get("/", getThemes);
router.get("/:id", getOneTheme);
router.delete("/:id", deleteTheme);
router.post("/", addTheme);
export default router;