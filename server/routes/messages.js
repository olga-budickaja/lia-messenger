import express from "express";
import { getMess } from "../controllers/message.js";

const router = express.Router();

router.get("/", getMess);

export default router