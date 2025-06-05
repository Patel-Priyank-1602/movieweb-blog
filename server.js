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

  // Handle incoming messages (optional, not used in this case)
  ws.on("message", (message) => {
    console.log("Received:", message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
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
  const comment = req.body;
  comments = [comment, ...comments]; // Add new comment to the front
  broadcastComments(); // Notify all clients
  res.status(201).json(comment);
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});