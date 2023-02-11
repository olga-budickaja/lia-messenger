import express from "express";
import { addConversation } from "../controllers/conversation.js";

const router = express.Router();

router.post("/", addConversation);
export default router;