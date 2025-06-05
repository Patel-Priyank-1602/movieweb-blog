require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors({
  origin: process.env.CLIENT_URL || "*", // Set to your frontend URL (e.g., https://your-app.vercel.app)
}));
app.use(express.json());

// MySQL connection configuration using environment variables
const dbConfig = {
  host: process.env.MYSQLHOST || "crossover.proxy.rlwy.net",
  port: process.env.MYSQLPORT || 36875,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "DuCgnuQcxSvVBAQhdtzDtSuAyvAsbwhe",
  database: process.env.MYSQLDATABASE || "railway",
};

// Create a MySQL connection pool
const pool = mysql.createPool({
  ...dbConfig,
  connectionLimit: 10,
  waitForConnections: true,
});

// Keep connection alive to prevent timeouts
const keepConnectionAlive = async () => {
  try {
    const [results] = await pool.query("SELECT 1");
    console.log("Database connection alive:", results);
  } catch (error) {
    console.error("Error keeping connection alive:", error.message);
  }
};
setInterval(keepConnectionAlive, 30000);

// WebSocket connection handling
wss.on("connection", async (ws) => {
  try {
    const [comments] = await pool.query("SELECT * FROM comments ORDER BY timestamp DESC");
    const formattedComments = comments.map(comment => ({
      ...comment,
      timestamp: new Date(comment.timestamp).toLocaleString(),
    }));
    ws.send(JSON.stringify({ type: "comments", data: formattedComments }));
  } catch (error) {
    console.error("Error fetching comments for WebSocket:", error.message);
  }

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });
});

// Broadcast comments to all connected WebSocket clients
const broadcastComments = async () => {
  try {
    const [comments] = await pool.query("SELECT * FROM comments ORDER BY timestamp DESC");
    const formattedComments = comments.map(comment => ({
      ...comment,
      timestamp: new Date(comment.timestamp).toLocaleString(),
    }));
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "comments", data: formattedComments }));
      }
    });
  } catch (error) {
    console.error("Error broadcasting comments:", error.message);
  }
};

// API to get all comments
app.get("/comments", async (req, res) => {
  try {
    const [comments] = await pool.query("SELECT * FROM comments ORDER BY timestamp DESC");
    const formattedComments = comments.map(comment => ({
      ...comment,
      timestamp: new Date(comment.timestamp).toLocaleString(),
    }));
    res.json(formattedComments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API to post a new comment
app.post("/comments", async (req, res) => {
  const { username, text } = req.body;
  if (!username || !text) {
    console.error("Invalid comment data:", { username, text });
    return res.status(400).json({ error: "Username and text are required" });
  }

  const comment = {
    username: username.trim(),
    text: text.trim(),
    timestamp: new Date(),
  };

  try {
    const [result] = await pool.query(
      "INSERT INTO comments (username, text, timestamp) VALUES (?, ?, ?)",
      [comment.username, comment.text, comment.timestamp]
    );
    const newComment = {
      id: result.insertId,
      username: comment.username,
      text: comment.text,
      timestamp: comment.timestamp.toLocaleString(),
    };
    await broadcastComments();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error posting comment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Test database connection on startup
(async () => {
  try {
    const [results] = await pool.query("SELECT 1");
    console.log("MySQL connection successful:", results);
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
})();

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});