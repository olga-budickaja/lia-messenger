import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const resultsPerPage = 25;

export const getThemes = (req, res) => {
    let q = `SELECT t.*, u.id AS userId, username, email, homepage FROM themes AS t JOIN users AS u ON (u.id = t.userId)`

    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        //Determine the SQL LIMIT starting number
        const startingLimit = (page -1) * resultsPerPage;
        //get the relevant number of THEMES for this starting page
        q = `SELECT t.*, u.id AS userId, username, email, homepage FROM themes AS t JOIN users AS u 
        ON (u.id = t.userId) LIMIT ${startingLimit},${resultsPerPage}`
        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            let iterator = (page - 5) < 1 ? 1 : page - 5;
            let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages -page);
            if(endingLink < (page + 4)) {
                iterator -= (page + 4) - numberOfPages;
            }
            res.status(200).json({ data: result, page, endingLink, iterator, numberOfPages, resultsPerPage });
        });
    });
}
// export const getThemes = (req, res) => {
//     const q = `SELECT t.*, u.id AS userId, username, email, homepage FROM themes AS t JOIN users AS u ON (u.id = t.userId)`
//
//     db.query(q, (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json(data);
//     });
// }
export const getOneTheme = (req, res) => {
    const q = `SELECT t.*, u.id AS userId, username, email, homepage FROM themes AS t JOIN users AS u ON (u.id = t.userId) WHERE t.id = ?`;

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
    const token = req.cookies.access_token

    if(!token) return res.status(401).json({ message: "Not authenticated!" });

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if ( err ) return res.status(403).json({ message: "Token is not valid!" });

        const q = "INSERT INTO themes (`desc`, `fileImg`, `userId`, `fileTxt`, `homepage`, `createAt`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.fileImg,
            userInfo.id,
            req.body.fileTxt,
            req.body.homepage,
            req.body.createAt
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({ message: "Theme has been created." });
        })
    });

}
