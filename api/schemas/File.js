import mongoose from "mongoose";

const FileMetadataSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'uploads.files' }, // Link to GridFS file
  filename: { type: String, required: true },
  uploadedBy: { type: String },
  description: { type: String },
  uploadDate: { type: Date, default: Date.now },
  expirationDate: {type: Date},
  contentHash: {type: String, required: true}
});

const FileMetadata = mongoose.model('FileMetadata', FileMetadataSchema);

export default FileMetadata;