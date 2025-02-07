import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import fs from 'fs'

//function to upload files to mongoDb
export const uploadFile = async (res, req) => {
	const db = mongoose.connection;
	let gfs;

	db.once('open', () => {
		gfs = Grid(db, mongoose.mongo);
		gfs.collection('fileUploads');
		console.log('GridFS initialized using gridfs-stream and Mongoose connection.');
	});

	if(!gfs) {
		throw new Error('GridFS initialization: unsuccessful.')
	}
	console.log('GridFS initialization: successful.')
	
	const data = req.body;
	const fileName = data.fileName
	
	const readStream = fs.createReadStream(data.filePath);
	const writeStream = gfs.createWriteStream({
		filename: fileName,
			//metadata: { uploadedBy: 'John Doe', uploadDate: new Date() },
	});

	readStream.pipe(writeStream)
		  .on('error', (err) => console.error(`Upload failed for ${fileName}:`, err))
		  .on('close', (file) => console.log(`File "${file.filename}" uploaded successfully!`));
};


//function to download files to mongoDb
export const downloadFile = async (req, res) => {
	const writeStream = fs.createWriteStream(outputPath);

	let gfs;

	//gfs.createReadStream({ filename: })
}