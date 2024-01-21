import { CustomResource, ResourceProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
export interface LexImportCustomResourceProps extends ResourceProps {
    readonly uid: string;
    readonly lexZipBucket?: s3.Bucket;
    readonly lexRoleArn?: string;
    readonly function: string;
    readonly resourceArn?: string;
    readonly policy?: object;
}
/**
 * Adds "action" functionality to the Policy Statement
 *
 * @private
 */
export declare class LexImportCustomResource extends Construct {
    readonly lambda: lambda.IFunction;
    readonly lexImport: CustomResource;
    constructor(scope: Construct, id: string, props: LexImportCustomResourceProps);
    private ensureLambda;
}
