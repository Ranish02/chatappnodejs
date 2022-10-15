const express = require('express');
const cors = require('cors');
const app = express();
const http = require("http");
const { Server } = require('socket.io');

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    console.log(`User Connected":${socket.id}`);
    socket.on("join_room", (data) => {
        // console.log("User Joined", socket.id);
        socket.join(data);
    });
    socket.on("send_message", (data) => {
        // console.log("User Joined", socket.id);
        console.log(data);
        console.log("Sending data");


        socket.to(data.room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});


server.listen(3001, () => {
    console.log("SERVER RUNNING");
})