import express from "express";
import { addUser, getUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", getUser)

export default router