import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { awsAccessKey, awsSecretAccessKey, awsRegion, bucketName, bucketFolderName } from '../../config/index.js';
import mongoose from 'mongoose';

const s3 = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            var fullPath = bucketFolderName + "/" + Date.now().toString() + "/" + file.originalname;
            console.log(fullPath);
            cb(null, fullPath)
        }
    })
});


export default upload.single('file');