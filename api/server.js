import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ws from "ws"

import mongoDb from "./services/mongoDb.js";
import mongoRouter from "./services/mongo_router.js";
import router from "./routes/routes.js"
import openai from "./services/openAi.js"


console.log('Starting server...');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

await mongoDb();

// Use the Mongo router for API routes
app.use("/api", router);

// Sample root route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});


const httpServer = app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
const wsServer = new ws.Server({ noServer: true });

httpServer.on('upgrade', (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (ws) => {
    wsServer.emit('connection', ws, req)
  });
});