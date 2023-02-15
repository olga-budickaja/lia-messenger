import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getThemes = (req, res) => {
    const q = `SELECT t.*, u.id AS userId, username FROM themes AS t JOIN users AS u ON (u.id = t.userId)`

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getOneTheme = (req, res) => {
    const q = `SELECT t.*, u.id AS userId, username FROM themes AS t JOIN users AS u ON (u.id = t.userId) WHERE t.id = ?`;

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data);
    });
}
export const deleteTheme = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Not authenticated!" });

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" });

        const q = "DELETE FROM themes WHERE `id` = ? AND `userId` = ?"

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json({ message: "You can delete only your message!" });

           return res.status(200).json({ message: "Message has been deleted." });
        })
    });
}

export const addTheme = (req, res) => {

}
