import { awsAccessKey, awsSecretAccessKey, awsRegion, bucketName } from '../../config/index.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async (key) => {
    try {
        // console.log(req.body)
        const s3 = new S3Client({
            region: awsRegion,
            credentials: {
                accessKeyId: awsAccessKey,
                secretAccessKey: awsSecretAccessKey
            }
        });

        const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
        const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 }); // expires in seconds
        console.log('Presigned URL: ', url);

        return url;

    } catch (exception) {
        console.error(exception);
        return null;
    }
};