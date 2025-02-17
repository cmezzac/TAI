import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// import { GetAwsKeys } from './awsSecretManager.js'

// const awsCredentials = await GetAwsKeys("TaiServerKeys", "AWSCURRENT");


const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export async function SimpleTest() {
    try {

        const filepath = 'D:\\Programming\\Projects\\TAI\\api\\services\\testfile.txt';

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: "testfile.txt",
            Body: fs.createReadStream(filepath),
        };

        await client.send(new PutObjectCommand(params)).then((data)=>{
            // Delete the file from the local filesystem after successful upload
            if (fs.existsSync(filepath)) {
                fs.unlink(filepath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully.');
                }
                });
            }
          });

    } catch (error) {
        console.log("Error: ", error);
    }
}