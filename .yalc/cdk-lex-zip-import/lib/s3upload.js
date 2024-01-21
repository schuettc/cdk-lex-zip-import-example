"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Upload = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");
const constructs_1 = require("constructs");
class S3Upload extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.lexZipBucket = new s3.Bucket(this, 'lexZipBucket', {
            publicReadAccess: false,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        new s3deploy.BucketDeployment(this, 'lexZipBucketDeploy', {
            sources: [s3deploy.Source.asset(props.sourceDirectory)],
            destinationBucket: this.lexZipBucket,
        });
    }
}
exports.S3Upload = S3Upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczN1cGxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvczN1cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTJEO0FBQzNELHlDQUF5QztBQUN6QywwREFBMEQ7QUFDMUQsMkNBQXVDO0FBTXZDLE1BQWEsUUFBUyxTQUFRLHNCQUFTO0lBR3JDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBb0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RELGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN4RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakJELDRCQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlUHJvcHMsIFJlbW92YWxQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgczNkZXBsb3kgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnQnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUzNVcGxvYWRQcm9wcyBleHRlbmRzIFJlc291cmNlUHJvcHMge1xuICByZWFkb25seSBzb3VyY2VEaXJlY3Rvcnk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFMzVXBsb2FkIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGxleFppcEJ1Y2tldDogczMuQnVja2V0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTM1VwbG9hZFByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMubGV4WmlwQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnbGV4WmlwQnVja2V0Jywge1xuICAgICAgcHVibGljUmVhZEFjY2VzczogZmFsc2UsXG4gICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICB9KTtcblxuICAgIG5ldyBzM2RlcGxveS5CdWNrZXREZXBsb3ltZW50KHRoaXMsICdsZXhaaXBCdWNrZXREZXBsb3knLCB7XG4gICAgICBzb3VyY2VzOiBbczNkZXBsb3kuU291cmNlLmFzc2V0KHByb3BzLnNvdXJjZURpcmVjdG9yeSldLFxuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHRoaXMubGV4WmlwQnVja2V0LFxuICAgIH0pO1xuICB9XG59XG4iXX0=