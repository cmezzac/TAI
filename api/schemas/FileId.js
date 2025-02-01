import mongoose from "mongoose";

const fielIdSchema = new mongoose.Schema({
    fileId:{
        type:String,
        required:false,
    }
});
const FileId = mongoose.model('FileId', fielIdSchema);

export default FileId;
