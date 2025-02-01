import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define a sample schema and model for demonstration
const sampleSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const Sample = mongoose.model("Sample", sampleSchema);

// Create a new document
router.post("/add", async (req, res) => {
  try {
    const newItem = new Sample(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: "Error adding item", error });
  }
});

// Get all documents
router.get("/items", async (req, res) => {
  try {
    const items = await Sample.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error });
  }
});

// Get a single document by ID
router.get("/item/:id", async (req, res) => {
  try {
    const item = await Sample.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving item", error });
  }
});

// Update a document by ID
router.put("/item/:id", async (req, res) => {
  try {
    const updatedItem = await Sample.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating item", error });
  }
});

// Delete a document by ID
router.delete("/item/:id", async (req, res) => {
  try {
    const deletedItem = await Sample.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});

export default router;
