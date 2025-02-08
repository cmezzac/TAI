

const uploadFile = async (req, res) => {
    let formData = req.file;
	console.log("File has been received: ", formData);
 

    return res.status(200).json({message: "file successfully uploaded"})
};

export default uploadFile;