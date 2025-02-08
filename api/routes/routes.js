import express from "express";
import multer, { memoryStorage } from "multer"
import uploadFile from "../controllers/apiControllers.js"

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

//POST
router.post("/upload", upload.single("file"), uploadFile);


//GET
//router.get("/download", downloadFile);

export default router;