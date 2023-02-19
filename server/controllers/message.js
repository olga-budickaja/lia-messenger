import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getMess = (req, res) => {
    const q = req.query.themeId
        ? `SELECT m.*, u.id AS uid, username, email FROM messages AS m JOIN users AS u ON (u.id = m.uid) WHERE m.themeId = ?`
        : `SELECT * FROM messages`

    db.query(q, [req.query.themeId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getConvMess = (req, res) => {
    const q = "SELECT m.*, u.id AS uid, username, email FROM users u JOIN members c JOIN messages m ON (m.uid = u.id) AND (c.senderId = u.id) OR (c.receiverId = u.id) WHERE c.id = ?";

    db.query(q, [req.params.conversationId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data)
    });
}
export const deleteMess = (req, res) => {
    const token = req.cookies.access_token

    if(!token) return res.status(401).json({ message: "Not authenticated!" });

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" });

        const q = "DELETE FROM messages WHERE `id` = ? AND `uid` = ?"

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json({ message: "You can delete only your message!" });

            return res.status(200).json("Message has been deleted.")
        })
    });
};
export const addMess = (req, res) => {
    const token = req.cookies.access_token

    if(!token) return res.status(401).json({ message: "Not authenticated!" });

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if ( err ) return res.status(403).json({ message: "Token is not valid!" });

        const q = "INSERT INTO messages (`desc`, `fileImg`, `fileTxt`, `uid`, `memId`, `themeId`, `homepage`, `createAt`, `answerId`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.fileImg,
            req.body.fileTxt,
            userInfo.id,
            req.body.memId,
            req.body.themeId,
            req.body.homepage,
            req.body.createAt,
            req.body.answerId
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({ message: "Message has been created." });
        })
    });
}