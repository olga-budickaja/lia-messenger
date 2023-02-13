import { db } from "../db.js";

//new conv
export const addConversation = (req, res) => {
    const q = `SELECT * FROM members WHERE senderId = ?`;

    db.query(q, [req.body.senderId], (err) => {
        if (err) return res.status(500).json(err);
        //Create new conversation
        const q = "INSERT INTO members (`senderId`, `receiverId`) VALUE (?)";
        const values = [
            req.body.senderId,
            req.body.receiverId,
        ];

        db.query(q, [values], (err) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(values);
        });

    });
};
//get conv of a user
export const getConvUser = (req, res) => {
    const q = `SELECT * FROM members WHERE senderId = ? OR receiverId = ?`;
    const fetchId = req.params.userId;

    db.query(q, [fetchId, fetchId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}