import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const register = (req, res) => {

    //CHECK USER IF EXIST

    const q = "SELECT * FROM users WHERE username = ? OR email = ?"

    db.query(q, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json({ message: "User already exist!" });
        //CREATE NEW USER
        const q = "INSERT INTO users (`username`, `email`, `homepage`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            req.body.homepage
        ];

        db.query(q, [values], (err) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ message: "User has been created." });
        });
    });
}
export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";

    db.query(q, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Wrong username or email!" });

        const username = req.body.username;

        if (!username) return res.status(400).json({ message: "Wrong username!" });

        const email = req.body.email

        if (!email) return res.status(400).json({ message: "Wrong email!" });

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);

        const {...others} = data[0]

        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(others);
    });
}
export const logout = (req, res) => {
    res.clearCookie("access_token", {
        secure: true,
        sameSite: "none"
    }).status(200).json({ message: "User has been logged out." })
}