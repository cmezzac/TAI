import express from "express";
import mongoose from "mongoose";
import VectorStoreId from "./schemas/VectorStore.js"
import cors from "cors";
import dotenv from "dotenv";

import openAi from "./services/openAi.js"

const { initOpenAi, getOrCreateVectorStore, addFileToVectorStoreFiles, prepFiles, makeThreadMessage, PromptRequestAndResponseAsync, prepTxtFiles } = openAi;

import mongoRouter from "./mongo_router.js"; // Import the router


console.log('Starting server...');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

// Use the Mongo router for API routes
app.use("/api", mongoRouter);

// Sample root route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



//Setup openAI
async () => {
  
};
