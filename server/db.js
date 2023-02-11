import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config()

const MYSQL_KEY = process.env.MYSQL_KEY
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: MYSQL_KEY,
    database: "lia_messenger"
});