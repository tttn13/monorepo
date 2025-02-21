import { Client } from 'minio';
import 'dotenv/config'

// export const minioClient = new Client({
//   endPoint: process.env.MINIO_ENDPOINT || "",  // Replace with your MinIO server address
//   port: Number(process.env.PORT) || 80,             // Default MinIO port
//   useSSL: true,          // Set to true if using HTTPS
//   accessKey: process.env.MINIO_ACCESS_KEY,     // Your MinIO access key
//   secretKey: process.env.MINIO_SECRET_KEY // Your MinIO secret key
// });
export const minioClient = new Client({
  endPoint: process.env.AWS_ENDPOINT || "", 
  region: 'us-east-1',
  useSSL: true,         
  accessKey: process.env.AWS_ACCESSKEY,     
  secretKey: process.env.AWS_SECRETKEY 
});
export async function setBucketPublicPolicy() {
  // const bucketName = 'zucal-photos';
  // const policy = {
  //   Version: '2012-10-17',
  //   Statement: [  
  //     {
  //       Sid: 'PublicRead',
  //       Effect: 'Allow',
  //       Principal: '*',
  //       Action: ['s3:GetObject'],
  //       Resource: [`arn:aws:s3:::${bucketName}/*`]
  //     }
  //   ]
  // };

  // try {
  //   await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
  //   console.log('Bucket policy set to public read');
  // } catch (error) {
  //   console.error('Error setting bucket policy:', error);
  //   throw error;
  // }
}

// export async function checkBucketPolicy() {
//   try {
//     const policy = await minioClient.getBucketPolicy('zucal-photos');
//     console.log('Current bucket policy:', policy);
//   } catch (error) {
//     console.error('Error checking bucket policy:', error);
//   }
// }

export async function checkMinIO() {
  try {
    const bucketName = 'zucal-photos';
    const exists = await minioClient.bucketExists(bucketName);
    exists ? console.log(`bucket exists`) : console.log(`bucket doest not exist`);
  } catch (error) {
    console.error('❌ Failed to connect to MinIO', error);
  }
}