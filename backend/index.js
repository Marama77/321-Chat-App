const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

// Socket.io einrichten
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chat message", (msg) => {
        console.log("Message:", msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// MongoDB verbinden
mongoose
    .connect("mongodb://mongodb:27017/chat-db")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

// Test Route
app.get("/api/test", (req, res) => {
    res.send("Backend läuft!");
});

// Server starten
server.listen(3000, () => {
    console.log("Backend läuft auf Port 3000");
});