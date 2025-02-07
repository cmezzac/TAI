// import mongoose from "mongoose";

// const FileMetadataSchema = new mongoose.Schema({
//   fileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'uploads.files' }, // Link to GridFS file
//   fileType: { type: String, required: true },
//   filename: { type: String, required: true },
//   uploadedBy: { type: String },
//   description: { type: String },
//   uploadDate: { type: Date, default: Date.now },
//   expirationDate: { type: Date },
//   contentHash: { type: String, required: true },
//   openAi: { type: String, required: false },
//   openAiexpiryDate: { type: Date, required: false }
// });

// const FileMetadata = mongoose.model('FileMetadata', FileMetadataSchema);

// export default FileMetadata;