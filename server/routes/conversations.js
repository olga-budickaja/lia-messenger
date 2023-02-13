import express from "express";
import { addConversation, getConvUser } from "../controllers/conversation.js";

const router = express.Router();

router.post("/", addConversation);
router.get("/:userId", getConvUser);
export default router;