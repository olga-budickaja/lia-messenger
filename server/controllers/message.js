import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getMess = (req, res) => {
    const token = req.cookies.access_token
    const jwt_key = process.env.JWT_KEY

    jwt.verify(token, jwt_key, (err, userInfo) => {

    })

    const q = `SELECT m.*, u.id AS uid, username FROM messages AS m JOIN users AS u ON (u.id = m.uid)
    JOIN members AS b ON (m.uid = b.senderId AND b.receiverId = ?)`

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}