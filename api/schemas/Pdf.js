import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    base64: {
        type:String,
        required:true
    }
});

const PdfFile = mongoose.model('PdfFile', pdfSchema);

export default PdfFile;