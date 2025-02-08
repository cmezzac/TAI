import mongoose from "mongoose";

const VectorStoreIdSchema = new mongoose.Schema({
    VectorStoreId:{
        type:String,
        required:true,
    }
}); //need to add collectionId if you want to use this in this way
const VectorStoreId = mongoose.model('VectorStoreId', VectorStoreIdSchema);

export default VectorStoreId;
