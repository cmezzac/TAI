import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));