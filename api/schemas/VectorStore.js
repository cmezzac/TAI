import mongoose, { Collection } from "mongoose";

const VectorStoreIdSchema = new mongoose.Schema({
    VectorStoreId:{
        type:String,
        required:true,
    }
}, {Collection: 'VectorStoreId'});
const VectorStoreId = mongoose.model('VectorStoreId', VectorStoreIdSchema);

export default VectorStoreId;
