import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { request } from "express";

dotenv.config();
export const register = (req, res) => {

    //CHECK USER IF EXIST

    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json({ message: "User already exist!" });
        //CREATE NEW USER
        const q = "INSERT INTO users (`username`, `email`, `avatar`, `homepage`) VALUE (?)";

        // if(!req.body.captcha) {
        //     return res.json({ message: "Captcha is undefined!" });
        //
        //     const CAPTCHA_KEY = process.env.CAPTCHA_KEY
        //
        //     const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_KEY}&response=${req.body.captcha}`;
        //
        //     req(verifyUrl, (err, res, body) => {
        //         if (err) console.log(err)
        //         body = JSON.parse(body);
        //
        //         if (!body.success || body.score < 0.4) {
        //             return res.json({ message: "You might be a robot, sorry!! You are banned!", score: body.score })
        //         }
        //
        //         return res.json({ message: "Captcha have been verified!", score: body.score })
        //     })
        // }

        const values = [
            req.body.username,
            req.body.email,
            req.body.avatar,
            req.body.homepage
        ];

        db.query(q, [values], (err) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ message: "User has been created." });
        });
    });
}
export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "User not found" });

        const username = req.body.username

        if (!username) return res.status(400).json({ message: "Wrong username!" });

        const SECRET_KEY = process.env.MYSQL_KEY

        const token = jwt.sign({ id: data[0].id }, SECRET_KEY);

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