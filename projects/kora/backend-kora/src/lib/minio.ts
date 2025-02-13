import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: '100.118.120.108',  // Replace with your MinIO server address
  port: 80,             // Default MinIO port
  useSSL: false,          // Set to true if using HTTPS
  accessKey: 'x7oY0CuvKggnCIrgi6zp',     // Your MinIO access key
  secretKey: 'hshZJGy4DBRy0qxqQKwmzSytkxkUkKqKjuEOCJjk' // Your MinIO secret key
});

export async function setBucketPublicPolicy() {
  const bucketName = 'zucal-photos';
  const policy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicRead',
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }
    ]
  };

  try {
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log('Bucket policy set to public read');
  } catch (error) {
    console.error('Error setting bucket policy:', error);
    throw error;
  }
}

export async function checkBucketPolicy() {
  try {
    const policy = await minioClient.getBucketPolicy('zucal-photos');
    console.log('Current bucket policy:', policy);
  } catch (error) {
    console.error('Error checking bucket policy:', error);
  }
}

export async function checkMinIO() {
  try {
    const bucketName = 'zucal-photos';
    const exists = await minioClient.bucketExists(bucketName);
    exists ? console.log(`bucket exists`) : console.log(`bucket doest not exist`);
  } catch (error) {
    console.error('❌ Failed to connect to MinIO', error);
  }
}