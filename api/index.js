import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import openAi from "./openAi.js"

const { initOpenAi, getOrCreateVectorStore, addFileToVectorStoreFiles, prepFiles, makeThreadMessage, makePromptReq, getRunStatus } = openAi;

import mongoRouter from "./mongo_router.js"; // Import the router


console.log('Starting server...');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://christophermezzacappa818:MkaXqdJ9jlTLhvII@hackathon.lfr6n.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));



//test open ai
let vectorStore = await getOrCreateVectorStore();
console.log("This is the vector store object: ", vectorStore, "\n");

const fileId = await prepFiles("test.txt");
const threadMsg = await makeThreadMessage("A list of words", thread.id, fileId);
console.log("This is the threadMsg object: ", threadMsg, "\n");

await addFileToVectorStoreFiles(vectorStore.id);

const {assistant, thread} = await initOpenAi(vectorStore.id);
console.log("This is the assistant object: ", assistant, "\n");
console.log("This is the thread object: ", thread, "\n");

// const prompt = await makePromptReq(assistant.id, thread.id, "return all words from the file that start with an H")
// console.log("This is the prompt request: ", prompt, "\n");

// let run = await getRunStatus(thread.id, prompt.id);
// console.log("This is the prompt answer: ", prompt, "\n");

// Sample route

// Use the Mongo router for API routes
app.use("/api", mongoRouter);

// Sample root route

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
