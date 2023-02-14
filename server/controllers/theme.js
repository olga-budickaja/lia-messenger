import { db } from "../db.js";

export const getThemes = (req, res) => {
    const q = `SELECT t.*, u.id AS userId, username FROM themes AS t JOIN users AS u ON (u.id = t.userId)`

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getOneTheme = (req, res) => {

}
export const deleteTheme = (req, res) => {

}

export const addTheme = (req, res) => {

}
