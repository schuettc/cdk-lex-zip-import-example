"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexImportCustomResource = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
/* eslint-disable @typescript-eslint/indent */
const path = require("path");
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
const lambda = require("aws-cdk-lib/aws-lambda");
const cr = require("aws-cdk-lib/custom-resources");
const constructs_1 = require("constructs");
/**
 * Adds "action" functionality to the Policy Statement
 *
 * @private
 */
class LexImportCustomResource extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.lambda = this.ensureLambda();
        if (props.lexZipBucket) {
            props.lexZipBucket.grantRead(this.lambda);
        }
        const LexImportProvider = new cr.Provider(this, 'LexImportProvider', {
            onEventHandler: this.lambda,
        });
        const lexProps = {
            uid: props.uid,
            lexZipBucket: props.lexZipBucket?.bucketName,
            lexRoleArn: props.lexRoleArn,
            function: props.function,
            resourceArn: props.resourceArn,
            policy: JSON.stringify(props.policy),
        };
        this.lexImport = new aws_cdk_lib_1.CustomResource(this, 'LexImportCustomResource', {
            serviceToken: LexImportProvider.serviceToken,
            properties: lexProps,
        });
    }
    ensureLambda() {
        const stack = cdk.Stack.of(this);
        const constructName = 'LexImportCustomResource';
        const existing = stack.node.tryFindChild(constructName);
        if (existing) {
            return existing;
        }
        const lexCustomResourceRole = new iam.Role(this, 'lexCustomResourceRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                ['lambdaPolicy']: new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            resources: ['*'],
                            actions: [
                                'lex:UpdateSlot',
                                'lex:ListBots',
                                'lex:UpdateBotAlias',
                                'lex:DeleteCustomVocabulary',
                                'lex:DeleteBotVersion',
                                'lex:DeleteBotChannel',
                                'lex:CreateResourcePolicy',
                                'lex:UpdateBotLocale',
                                'lex:ListBotAliases',
                                'lex:CreateCustomVocabulary',
                                'lex:CreateBotLocale',
                                'lex:DeleteIntent',
                                'lex:StartImport',
                                'lex:UpdateSlotType',
                                'lex:BuildBotLocale',
                                'lex:CreateBot',
                                'lex:DeleteBotAlias',
                                'lex:CreateIntent',
                                'lex:CreateUploadUrl',
                                'lex:DeleteBot',
                                'lex:CreateBotAlias',
                                'lex:CreateSlotType',
                                'lex:DeleteBotLocale',
                                'lex:UpdateCustomVocabulary',
                                'lex:UpdateResourcePolicy',
                                'lex:CreateSlot',
                                'lex:DeleteSlot',
                                'lex:UpdateBot',
                                'lex:DeleteSlotType',
                                'lex:UpdateIntent',
                                'lex:DeleteResourcePolicy',
                                'lex:DescribeImport',
                                'iam:PassRole',
                            ],
                        }),
                    ],
                }),
            },
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
            ],
        });
        const fn = new lambda.Function(stack, constructName, {
            runtime: lambda.Runtime.PYTHON_3_9,
            code: lambda.Code.fromAsset(path.join(__dirname, '../resources')),
            handler: 'index.handler',
            architecture: lambda.Architecture.ARM_64,
            role: lexCustomResourceRole,
            timeout: cdk.Duration.minutes(1),
        });
        return fn;
    }
}
exports.LexImportCustomResource = LexImportCustomResource;
_a = JSII_RTTI_SYMBOL_1;
LexImportCustomResource[_a] = { fqn: "cdk-lex-zip-import.LexImportCustomResource", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tUmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY3VzdG9tUmVzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBOEM7QUFDOUMsNkJBQTZCO0FBQzdCLG1DQUFtQztBQUNuQyw2Q0FBNEQ7QUFDNUQsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUVqRCxtREFBbUQ7QUFDbkQsMkNBQXVDO0FBVXZDOzs7O0dBSUc7QUFDSCxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBSXBELFlBQ0UsS0FBZ0IsRUFDaEIsRUFBVSxFQUNWLEtBQW1DO1FBRW5DLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFbEMsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQztRQUVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUNuRSxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUc7WUFDZixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVO1lBQzVDLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUM1QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO1lBQzlCLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDckMsQ0FBQztRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSw0QkFBYyxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNuRSxZQUFZLEVBQUUsaUJBQWlCLENBQUMsWUFBWTtZQUM1QyxVQUFVLEVBQUUsUUFBUTtTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sWUFBWTtRQUNsQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxNQUFNLGFBQWEsR0FBRyx5QkFBeUIsQ0FBQztRQUNoRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLFFBQVEsRUFBRTtZQUNaLE9BQU8sUUFBMkIsQ0FBQztTQUNwQztRQUVELE1BQU0scUJBQXFCLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUN4RSxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUM7WUFDM0QsY0FBYyxFQUFFO2dCQUNkLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDO29CQUN2QyxVQUFVLEVBQUU7d0JBQ1YsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDOzRCQUN0QixTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7NEJBQ2hCLE9BQU8sRUFBRTtnQ0FDUCxnQkFBZ0I7Z0NBQ2hCLGNBQWM7Z0NBQ2Qsb0JBQW9CO2dDQUNwQiw0QkFBNEI7Z0NBQzVCLHNCQUFzQjtnQ0FDdEIsc0JBQXNCO2dDQUN0QiwwQkFBMEI7Z0NBQzFCLHFCQUFxQjtnQ0FDckIsb0JBQW9CO2dDQUNwQiw0QkFBNEI7Z0NBQzVCLHFCQUFxQjtnQ0FDckIsa0JBQWtCO2dDQUNsQixpQkFBaUI7Z0NBQ2pCLG9CQUFvQjtnQ0FDcEIsb0JBQW9CO2dDQUNwQixlQUFlO2dDQUNmLG9CQUFvQjtnQ0FDcEIsa0JBQWtCO2dDQUNsQixxQkFBcUI7Z0NBQ3JCLGVBQWU7Z0NBQ2Ysb0JBQW9CO2dDQUNwQixvQkFBb0I7Z0NBQ3BCLHFCQUFxQjtnQ0FDckIsNEJBQTRCO2dDQUM1QiwwQkFBMEI7Z0NBQzFCLGdCQUFnQjtnQ0FDaEIsZ0JBQWdCO2dDQUNoQixlQUFlO2dDQUNmLG9CQUFvQjtnQ0FDcEIsa0JBQWtCO2dDQUNsQiwwQkFBMEI7Z0NBQzFCLG9CQUFvQjtnQ0FDcEIsY0FBYzs2QkFDZjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGLENBQUM7YUFDSDtZQUNELGVBQWUsRUFBRTtnQkFDZixHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUN4QywwQ0FBMEMsQ0FDM0M7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFO1lBQ25ELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU07WUFDeEMsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7QUExR0gsMERBMkdDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2luZGVudCAqL1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDdXN0b21SZXNvdXJjZSwgUmVzb3VyY2VQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgKiBhcyBjciBmcm9tICdhd3MtY2RrLWxpYi9jdXN0b20tcmVzb3VyY2VzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExleEltcG9ydEN1c3RvbVJlc291cmNlUHJvcHMgZXh0ZW5kcyBSZXNvdXJjZVByb3BzIHtcbiAgcmVhZG9ubHkgdWlkOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxleFppcEJ1Y2tldD86IHMzLkJ1Y2tldDtcbiAgcmVhZG9ubHkgbGV4Um9sZUFybj86IHN0cmluZztcbiAgcmVhZG9ubHkgZnVuY3Rpb246IHN0cmluZztcbiAgcmVhZG9ubHkgcmVzb3VyY2VBcm4/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBvbGljeT86IG9iamVjdDtcbn1cbi8qKlxuICogQWRkcyBcImFjdGlvblwiIGZ1bmN0aW9uYWxpdHkgdG8gdGhlIFBvbGljeSBTdGF0ZW1lbnRcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgTGV4SW1wb3J0Q3VzdG9tUmVzb3VyY2UgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgbGFtYmRhOiBsYW1iZGEuSUZ1bmN0aW9uO1xuICBwdWJsaWMgcmVhZG9ubHkgbGV4SW1wb3J0OiBDdXN0b21SZXNvdXJjZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzY29wZTogQ29uc3RydWN0LFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcHJvcHM6IExleEltcG9ydEN1c3RvbVJlc291cmNlUHJvcHMsXG4gICkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgdGhpcy5sYW1iZGEgPSB0aGlzLmVuc3VyZUxhbWJkYSgpO1xuXG4gICAgaWYgKHByb3BzLmxleFppcEJ1Y2tldCkge1xuICAgICAgcHJvcHMubGV4WmlwQnVja2V0LmdyYW50UmVhZCh0aGlzLmxhbWJkYSk7XG4gICAgfVxuXG4gICAgY29uc3QgTGV4SW1wb3J0UHJvdmlkZXIgPSBuZXcgY3IuUHJvdmlkZXIodGhpcywgJ0xleEltcG9ydFByb3ZpZGVyJywge1xuICAgICAgb25FdmVudEhhbmRsZXI6IHRoaXMubGFtYmRhLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbGV4UHJvcHMgPSB7XG4gICAgICB1aWQ6IHByb3BzLnVpZCxcbiAgICAgIGxleFppcEJ1Y2tldDogcHJvcHMubGV4WmlwQnVja2V0Py5idWNrZXROYW1lLFxuICAgICAgbGV4Um9sZUFybjogcHJvcHMubGV4Um9sZUFybixcbiAgICAgIGZ1bmN0aW9uOiBwcm9wcy5mdW5jdGlvbixcbiAgICAgIHJlc291cmNlQXJuOiBwcm9wcy5yZXNvdXJjZUFybixcbiAgICAgIHBvbGljeTogSlNPTi5zdHJpbmdpZnkocHJvcHMucG9saWN5KSxcbiAgICB9O1xuXG4gICAgdGhpcy5sZXhJbXBvcnQgPSBuZXcgQ3VzdG9tUmVzb3VyY2UodGhpcywgJ0xleEltcG9ydEN1c3RvbVJlc291cmNlJywge1xuICAgICAgc2VydmljZVRva2VuOiBMZXhJbXBvcnRQcm92aWRlci5zZXJ2aWNlVG9rZW4sXG4gICAgICBwcm9wZXJ0aWVzOiBsZXhQcm9wcyxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZW5zdXJlTGFtYmRhKCk6IGxhbWJkYS5GdW5jdGlvbiB7XG4gICAgY29uc3Qgc3RhY2sgPSBjZGsuU3RhY2sub2YodGhpcyk7XG4gICAgY29uc3QgY29uc3RydWN0TmFtZSA9ICdMZXhJbXBvcnRDdXN0b21SZXNvdXJjZSc7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBzdGFjay5ub2RlLnRyeUZpbmRDaGlsZChjb25zdHJ1Y3ROYW1lKTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIHJldHVybiBleGlzdGluZyBhcyBsYW1iZGEuRnVuY3Rpb247XG4gICAgfVxuXG4gICAgY29uc3QgbGV4Q3VzdG9tUmVzb3VyY2VSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdsZXhDdXN0b21SZXNvdXJjZVJvbGUnLCB7XG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFsnbGFtYmRhUG9saWN5J106IG5ldyBpYW0uUG9saWN5RG9jdW1lbnQoe1xuICAgICAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlU2xvdCcsXG4gICAgICAgICAgICAgICAgJ2xleDpMaXN0Qm90cycsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVCb3RBbGlhcycsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVDdXN0b21Wb2NhYnVsYXJ5JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZUJvdFZlcnNpb24nLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlQm90Q2hhbm5lbCcsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVSZXNvdXJjZVBvbGljeScsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVCb3RMb2NhbGUnLFxuICAgICAgICAgICAgICAgICdsZXg6TGlzdEJvdEFsaWFzZXMnLFxuICAgICAgICAgICAgICAgICdsZXg6Q3JlYXRlQ3VzdG9tVm9jYWJ1bGFyeScsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVCb3RMb2NhbGUnLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlSW50ZW50JyxcbiAgICAgICAgICAgICAgICAnbGV4OlN0YXJ0SW1wb3J0JyxcbiAgICAgICAgICAgICAgICAnbGV4OlVwZGF0ZVNsb3RUeXBlJyxcbiAgICAgICAgICAgICAgICAnbGV4OkJ1aWxkQm90TG9jYWxlJyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZUJvdCcsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVCb3RBbGlhcycsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVJbnRlbnQnLFxuICAgICAgICAgICAgICAgICdsZXg6Q3JlYXRlVXBsb2FkVXJsJyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZUJvdCcsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVCb3RBbGlhcycsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVTbG90VHlwZScsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVCb3RMb2NhbGUnLFxuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlQ3VzdG9tVm9jYWJ1bGFyeScsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVSZXNvdXJjZVBvbGljeScsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVTbG90JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZVNsb3QnLFxuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlQm90JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZVNsb3RUeXBlJyxcbiAgICAgICAgICAgICAgICAnbGV4OlVwZGF0ZUludGVudCcsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVSZXNvdXJjZVBvbGljeScsXG4gICAgICAgICAgICAgICAgJ2xleDpEZXNjcmliZUltcG9ydCcsXG4gICAgICAgICAgICAgICAgJ2lhbTpQYXNzUm9sZScsXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFxuICAgICAgICAgICdzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlJyxcbiAgICAgICAgKSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBmbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24oc3RhY2ssIGNvbnN0cnVjdE5hbWUsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLlBZVEhPTl8zXzksXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc291cmNlcycpKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGFyY2hpdGVjdHVyZTogbGFtYmRhLkFyY2hpdGVjdHVyZS5BUk1fNjQsXG4gICAgICByb2xlOiBsZXhDdXN0b21SZXNvdXJjZVJvbGUsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24ubWludXRlcygxKSxcbiAgICB9KTtcblxuICAgIHJldHVybiBmbjtcbiAgfVxufVxuIl19