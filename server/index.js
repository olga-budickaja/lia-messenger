import express from "express";
import authRoots from "./routes/auth.js";
import userRoots from "./routes/users.js";
import themeRoots from "./routes/themes.js";
import messageRoots from "./routes/messages.js";
import conversationRoots from "./routes/conversations.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

app.use("/api/auth", authRoots);
app.use("/api/users", userRoots);
app.use("/api/themes", themeRoots);
app.use("/api/conversations", conversationRoots);
app.use("/api/messages", messageRoots);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
});