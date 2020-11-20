import AWS from 'aws-sdk'

// configuration for s3 only
AWS.config.update({
  apiVersion: '2006-03-01',
  region: process.env.AWS_S3_REGION
})

export const S3 = new AWS.S3()
