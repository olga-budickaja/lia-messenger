import { db } from "../db.js";

export const addUser = (req, res) => {
    res.json("from user")
}
export const getUser = (req, res) => {
    const q = req.query.username
        ? `SELECT u.id FROM messages AS m JOIN users AS u ON (u.id = m.uid) WHERE u.username = ?`
        : `SELECT * FROM users`

    db.query(q, [req.query.username], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};
