import { db } from "../db.js";
import jwt from "jsonwebtoken";


//add
export const addMess = (req, res) => {
    const token = req.cookies.access_token

    if(!token) return res.status(401).json({ message: "Not authenticated!" });

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if ( err ) return res.status(403).json({ message: "Token is not valid!" });

        const q = "INSERT INTO messages (`desc`, `picture`, `file`, `uid`, `memId`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.picture,
            req.body.file,
            userInfo.id,
            req.body.memId
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({ message: "Message has been created." });
        })
    });
}
export const getMess = (req, res) => {
        const q = `SELECT m.*, u.id AS uid, username FROM messages AS m JOIN users AS u ON (u.id = m.uid)`

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
};
export const getOneMess = (req, res) => {
    const q = "SELECT `username`, `desc`, `picture`, `file` FROM users u JOIN messages m ON u.id = m.uid WHERE m.id = ? ";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0])
    })
};
export const deleteMess = (req, res) => {
    const token = req.cookies.access_token

    if(!token) return res.status(401).json({ message: "Not authenticated!" });

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" });

        const messId = req.params.id;
        const q = "DELETE FROM messages WERE `id` = ? AND `uid` = ? AND `memId` = ?"

        db.query(q, [messId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json({ message: "You can delete only your message!" });

            return res.status(200).json("Message has been deleted.")
        })
    });
};
