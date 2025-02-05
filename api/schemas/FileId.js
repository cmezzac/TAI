import mongoose from "mongoose";

const fileIdSchema = new mongoose.Schema({
    fileId:{
        type:String,
        required:false,
    }
});
const FileId = mongoose.model('FileId', fileIdSchema);

export default FileId;
