import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =  process.env.MONGO_URI;

const mongoDb = async () => {
    await mongoose
            .connect(MONGO_URI)
            .then(() => console.log("✅ MongoDB Connected"))
            .catch((err) => console.error("❌ MongoDB Connection Error:", err));
};

export default mongoDb;
