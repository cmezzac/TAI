import express from "express";
import multer from "multer";

import { uploadFile, downloadFile } from "./controllers/apiController.js";
//import { uploadFile, downloadFile } from "../controllers/mongoController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//POST
router.post("upload", uploadFile);


//GET
router.get("download", downloadFile);l