import { db } from "../db.js";

export const addConversation = (req, res) => {

//new conv
    const q = "SELECT * FROM members WHERE senderId = ?";

    db.query(q, [req.body.senderId], (err, data) => {
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

}