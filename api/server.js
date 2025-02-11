import express from "express";
import http from "http"
import cors from "cors";
import dotenv from "dotenv";
import {WebSocketServer} from "ws"

import mongoDb from "./services/mongoDb.js";
import router from "./routes/routes.js"

console.log('Starting server...');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

await mongoDb();


const server = http.createServer(app);
const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      try {
        const data = JSON.parse(message);
        ws.send(`${data.payload}`);
      } catch {
        ws.send(JSON.stringify({type:'message', payload:"Echo: "+ message}));
      }
  });

  ws.on('close', () => console.log('WebSocket disconnected'));
});


// Use the Mongo router for API routes
app.use("/api", router);

// Sample root route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});


const PORT = process.env.PORT || 5001;
const httpServer = server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));