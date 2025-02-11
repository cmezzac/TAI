import { uploadFileToMongo } from "../utils/mongoUtils";

const uploadFile = async (req, res) => {
    let formData = req.file;
	console.log("File has been received: ", formData);

    try {
        
    } catch(error) {

    }

    return res.status(200).json({message: "file successfully uploaded"})
};

export default uploadFile;