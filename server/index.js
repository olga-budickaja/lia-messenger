import express from "express";
import authRoots from "./routes/auth.js";
import userRoots from "./routes/users.js";
import messageRoots from "./routes/messages.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoots);
app.use("/api/users", userRoots);
app.use("/api/messages", messageRoots);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
});