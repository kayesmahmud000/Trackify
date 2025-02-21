require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://trackify-abc94.web.app", // Adjust based on frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

// **Connect to MongoDB**
mongoose.connect(process.env.MongoDb_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// **Task Model**
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 200 },
  category: { type: String, enum: ["To-Do", "In Progress", "Done"], required: true },
  timestamp: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// **Socket.io for Real-time Updates**
io.on("connection", (socket) => {
  console.log("Client Connected");

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

// **CRUD API Routes**
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ timestamp: 1 });
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, description, category } = req.body;
  const newTask = new Task({ title, description, category });
  await newTask.save();
  io.emit("task-updated"); // Notify clients
  res.status(201).json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const { category } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, { category }, { new: true });
  io.emit("task-updated");
  res.json(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  io.emit("task-updated");
  res.status(204).send();
});

// **Start Server**
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
