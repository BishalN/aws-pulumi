import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket('my-bucket', {
  website: { indexDocument: 'index.html' },
});

const bucketObject = new aws.s3.BucketObject('index.html', {
  bucket,
  acl: 'public-read',
  contentType: 'text/html',
  source: new pulumi.asset.FileAsset('index.html'),
});

// Export the name of the bucket
export const bucketName = bucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
