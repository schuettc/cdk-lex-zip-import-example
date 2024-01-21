import { ResourceProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
export interface S3UploadProps extends ResourceProps {
    readonly sourceDirectory: string;
}
export declare class S3Upload extends Construct {
    lexZipBucket: s3.Bucket;
    constructor(scope: Construct, id: string, props: S3UploadProps);
}
