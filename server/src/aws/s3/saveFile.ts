import { S3 } from './'

export default async (stream: any, filename: string, mimetype: string) => {
  const bucketName = 'wallzoe-images'
  const params = {
    ACL: 'public-read',
    Bucket: bucketName,
    Key: filename,
    Body: stream,
    ContentType: mimetype
  }
  try {
    await S3.upload(params).promise()
    return `https://${bucketName}.s3-${process.env.AWS_S3_REGION}.amazonaws.com/${filename}`
  } catch (err) {
    console.log(err, err.stack)
  }
}
