import express from 'express';
import FileId from '../schemas/FileId.js';
import PdfFile from '../schemas/Pdf.js';
import fs, { copyFileSync } from 'fs';
import openAi from "../services/openAi.js"
const { initOpenAi, getOrCreateVectorStore, updateVectorStoreFileIds, prepFiles, makeThreadMessage,PromptRequestAndResponseAsync,getSimplePromptResponse } = openAi;

const router = express.Router();

const threadId = "thread_xbwwV696PkcoYxEKMEmVTgar";
const assistId = "asst_td6TM4zF3SuhMlYB58QHbhCn"
const vsId = "vs_29ORI9AGRPlk2wXyx9p2URsk";


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
    
    const fileId = await prepFiles(pdfBuffer);
    await updateVectorStoreFileIds(vsId, fileId);
    
    await pdfFile.save();
    
    res.status(201).json({message:"Success Bello"});
  }
  catch(error){
    res.status(400).json({ message: "Error adding item", error });
  }
});


router.get("/prompt", async (req, res) => {
  try {

    const prompt = req.query.prompt;
    const response = await PromptRequestAndResponseAsync(assistId, threadId, prompt);
    
    

    res.status(200).json({ message: "Success Bello", body: response });
  } catch (error) {
    console.error("Error:", error.message);  // Log the error message for debugging
    res.status(400).json({ message: "Error adding item", error: error.message });
  }
});

router.get("/simpleprompt", async (req, res) => {
  try {
    const prompt = req.query.prompt; // Access query parameter
    console.log("Received prompt:", prompt);


    const response = await getSimplePromptResponse(prompt);
    console.log("Prompt Response:", response);  

    res.status(200).json({ message: "Success Bello", body: response });
  } catch (error) {
    console.error("Error:", error.message);  // Log the error message for debugging
    res.status(400).json({ message: "Error adding item", error: error.message });
  }
});


export default router;
