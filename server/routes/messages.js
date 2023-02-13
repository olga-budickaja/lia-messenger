import express from "express";
import { getMess, addMess, getOneMess, deleteMess } from "../controllers/message.js";

const router = express.Router();

router.post("/", addMess);
router.get("/", getMess);
router.get("/:id", getOneMess);
router.delete("/:id", deleteMess);

export default router