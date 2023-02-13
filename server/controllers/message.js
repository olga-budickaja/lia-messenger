import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getMess = (req, res) => {
    const token = req.cookies.access_token

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" });

        const q = `SELECT m.*, u.id AS uid, username FROM messages AS m JOIN users AS u ON (u.id = m.uid)`

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};