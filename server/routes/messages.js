import express from "express";
import { getMess, addMess, deleteMess, getConvMess } from "../controllers/message.js";

const router = express.Router();

router.get("/", getMess);
router.get("/:conversationId", getConvMess);
router.delete("/:id", deleteMess);
router.post("/", addMess);

export default router