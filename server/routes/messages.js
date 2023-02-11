import express from "express";
import { addMess } from "../controllers/message.js";

const router = express.Router();

router.get("/", addMess);

export default router