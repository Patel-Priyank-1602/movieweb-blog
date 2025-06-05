const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// In-memory comment storage (replace with a database in production)
let comments = [];

// WebSocket connection handling
wss.on("connection", (ws) => {
  // Send current comments to newly connected client
  ws.send(JSON.stringify({ type: "comments", data: comments }));

  // Handle incoming messages (for debugging or future use)
  ws.on("message", (message) => {
    console.log("Received:", message.toString());
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Broadcast comments to all connected WebSocket clients
const broadcastComments = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "comments", data: comments }));
    }
  });
};

// API to get all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// API to post a new comment
app.post("/comments", (req, res) => {
  const { username, text } = req.body;
  if (!username || !text) {
    return res.status(400).json({ error: "Username and text are required" });
  }
  const comment = {
    id: Date.now(), // Generate ID on the server
    username: username.trim(),
    text: text.trim(),
    timestamp: new Date().toLocaleString(),
  };
  comments = [comment, ...comments]; // Add new comment to the front
  broadcastComments(); // Notify all clients
  res.status(201).json(comment);
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});