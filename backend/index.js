const http = require("http");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//setup express server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//test route
app.use(express.json());
app.get("/api/test", (req, res) => {
    res.send("Server is running!");
});


//POST api/register
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const User = mongoose.model('User', new mongoose.Schema({
            username: { type: String, required: true },
            password: { type: String, required: true },
        }));
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//setup socket.io
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected!");

    //chat-messages
    socket.on("chat message", (msg) => {
        console.log("Message:", msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected!");
    });
});

//start express server
server.listen(PORT, () => {
    console.log("Server is listening on Port", PORT);
});



// MongoDB verbinden
mongoose
    .connect("mongodb://admin:secret@mongodb:27017/chat-db?authSource=admin")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));





