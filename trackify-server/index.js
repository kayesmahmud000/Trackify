require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MongoDb_URL , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String, maxlength: 200 },
    category: { type: String, enum: ["To-Do", "In Progress", "Done"], default: "To-Do" },
    timestamp: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);

// WebSocket Server Setup
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log(" WebSocket Connected");

    ws.on("message", async (message) => {
        const data = JSON.parse(message);
        if (data.type === "fetch") {
            const tasks = await Task.find();
            ws.send(JSON.stringify({ type: "update", tasks }));
        }
    });

    ws.on("close", () => console.log(" WebSocket Disconnected"));
});

// REST API Routes
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
    broadcastUpdate();
});

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
    broadcastUpdate();
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
    broadcastUpdate();
});

// Broadcast WebSocket Update
function broadcastUpdate() {
    Task.find().then((tasks) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: "update", tasks }));
            }
        });
    });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.get('/', (req, res)=>{
    res.send("Trackifiy")
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
