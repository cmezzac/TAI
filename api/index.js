import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import openAi from "./openAi.js"

const { initOpenAi, getOrCreateVectorStore, addFileToVectorStoreFiles, prepFiles, makeThreadMessage, makePromptReq, getAssistantResponse, waitForRunCompletion } = openAi;

import mongoRouter from "./mongo_router.js"; // Import the router


console.log('Starting server...');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const MONGO_URI =  "mongodb+srv://christophermezzacappa818:MkaXqdJ9jlTLhvII@hackathon.lfr6n.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));



//test open ai
let vectorStore = await getOrCreateVectorStore();
console.log("This is the vector store object: ", vectorStore, "\n");

const fileId = await prepFiles("test.txt");
await addFileToVectorStoreFiles(vectorStore.id, fileId);

const {assistant, thread} = await initOpenAi(vectorStore.id);
console.log("This is the assistant object: ", assistant, "\n");
console.log("This is the thread object: ", thread, "\n");

const threadMsg = await makeThreadMessage("Tell me about the start of the byzantine empire", thread.id, fileId);
console.log("This is the threadMsg object: ", threadMsg, "\n");

const prompt = await makePromptReq(assistant.id, thread.id, "Tell me about the start of the byzantine empire");
console.log("This is the prompt request: ", prompt, "\n");

(async () => {
  const runCompleted = await waitForRunCompletion(thread.id, prompt.id);
  
  if (runCompleted) {
      await getAssistantResponse(thread.id);
  }
})();

// Sample route

// Use the Mongo router for API routes
app.use("/api", mongoRouter);

// Sample root route

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
