const io = require("socket.io")(8900, {
    header: {
        allowedHeaders: "Access-Control-Allow-Credentials"
    },
    cors: {
        origin: "http://localhost:3000"
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.id === userId) &&
        users.push({ userId, socketId })
}
io.on("connection", (socket) => {
    console.log("a user connected.")
    //take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
});