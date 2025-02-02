import express from 'express';
import FileId from './schemas/FileId.js' // Make sure the path is correct
import PdfFile from './schemas/Pdf.js';
import fs, { copyFileSync } from 'fs';
import openAi from "./openAi.js"

const { initOpenAi, getOrCreateVectorStore, addFileToVectorStoreFiles, prepFiles, makeThreadMessage } = openAi;

const router = express.Router();

router.post("/addFileId", async (req, res) => {
  try {
    const newFileId = new FileId(req.body);  // This will now work correctly as FileId is a model
    console.log(newFileId);
    await newFileId.save();                  // Saves the document to MongoDB
    res.status(201).json(newFileId);         // Responds with the saved document
  } catch (error) {
    res.status(400).json({ message: "Error adding item", error });
  }
});

router.post("/addPdf" , async (req,res)=> {
  try{
    const pdfFile = new PdfFile(req.body);
    const pdfBuffer = Buffer.from(base64Data, 'base64');
    await prepFiles(pdfBuffer);
    
    await pdfFile.save();
    
    res.status(201).json({message:"Success Bello"});
  }
  catch(error){
    res.status(400).json({ message: "Error adding item", error });
  }
});


router.get("/prompt" , async (req,res)=> {
  try{
    const prompt = req.params[0];
    console.log("Prompt: ", prompt);
    const promptRes = await PromptRequestAndResponseAsync(prompt=prompt)
    res.status(201).json({message:"Success Bello", body:promptRes});
  }
  catch(error){
    res.status(400).json({ message: "Error adding item", error });
  }
});

export default router;
