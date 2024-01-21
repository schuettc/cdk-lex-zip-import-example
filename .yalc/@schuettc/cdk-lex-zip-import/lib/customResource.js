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
 * @hideconstructor
 */
class LexImportCustomResource extends constructs_1.Construct {
    constructor(scope, id, props) {
        var _b;
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
            lexZipBucket: (_b = props.lexZipBucket) === null || _b === void 0 ? void 0 : _b.bucketName,
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
LexImportCustomResource[_a] = { fqn: "@schuettc/cdk-lex-zip-import.LexImportCustomResource", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tUmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY3VzdG9tUmVzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBOEM7QUFDOUMsNkJBQTZCO0FBQzdCLG1DQUFtQztBQUNuQyw2Q0FBNEQ7QUFDNUQsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUVqRCxtREFBbUQ7QUFDbkQsMkNBQXVDO0FBVXZDOzs7O0dBSUc7QUFDSCxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBSXBELFlBQ0UsS0FBZ0IsRUFDaEIsRUFBVSxFQUNWLEtBQW1DOztRQUVuQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRWxDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtZQUN0QixLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0M7UUFFRCxNQUFNLGlCQUFpQixHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDbkUsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHO1lBQ2YsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsWUFBWSxRQUFFLEtBQUssQ0FBQyxZQUFZLDBDQUFFLFVBQVU7WUFDNUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO1lBQzVCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUN4QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLDRCQUFjLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ25FLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO1lBQzVDLFVBQVUsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sYUFBYSxHQUFHLHlCQUF5QixDQUFDO1FBQ2hELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxRQUEyQixDQUFDO1NBQ3BDO1FBRUQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ3hFLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzRCxjQUFjLEVBQUU7Z0JBQ2QsQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUM7b0JBQ3ZDLFVBQVUsRUFBRTt3QkFDVixJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUM7NEJBQ3RCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQzs0QkFDaEIsT0FBTyxFQUFFO2dDQUNQLGdCQUFnQjtnQ0FDaEIsY0FBYztnQ0FDZCxvQkFBb0I7Z0NBQ3BCLDRCQUE0QjtnQ0FDNUIsc0JBQXNCO2dDQUN0QixzQkFBc0I7Z0NBQ3RCLDBCQUEwQjtnQ0FDMUIscUJBQXFCO2dDQUNyQixvQkFBb0I7Z0NBQ3BCLDRCQUE0QjtnQ0FDNUIscUJBQXFCO2dDQUNyQixrQkFBa0I7Z0NBQ2xCLGlCQUFpQjtnQ0FDakIsb0JBQW9CO2dDQUNwQixvQkFBb0I7Z0NBQ3BCLGVBQWU7Z0NBQ2Ysb0JBQW9CO2dDQUNwQixrQkFBa0I7Z0NBQ2xCLHFCQUFxQjtnQ0FDckIsZUFBZTtnQ0FDZixvQkFBb0I7Z0NBQ3BCLG9CQUFvQjtnQ0FDcEIscUJBQXFCO2dDQUNyQiw0QkFBNEI7Z0NBQzVCLDBCQUEwQjtnQ0FDMUIsZ0JBQWdCO2dDQUNoQixnQkFBZ0I7Z0NBQ2hCLGVBQWU7Z0NBQ2Ysb0JBQW9CO2dDQUNwQixrQkFBa0I7Z0NBQ2xCLDBCQUEwQjtnQ0FDMUIsY0FBYzs2QkFDZjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGLENBQUM7YUFDSDtZQUNELGVBQWUsRUFBRTtnQkFDZixHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUN4QywwQ0FBMEMsQ0FDM0M7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFO1lBQ25ELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU07WUFDeEMsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7QUF6R0gsMERBMEdDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2luZGVudCAqL1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDdXN0b21SZXNvdXJjZSwgUmVzb3VyY2VQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgKiBhcyBjciBmcm9tICdhd3MtY2RrLWxpYi9jdXN0b20tcmVzb3VyY2VzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExleEltcG9ydEN1c3RvbVJlc291cmNlUHJvcHMgZXh0ZW5kcyBSZXNvdXJjZVByb3BzIHtcbiAgcmVhZG9ubHkgdWlkOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxleFppcEJ1Y2tldD86IHMzLkJ1Y2tldDtcbiAgcmVhZG9ubHkgbGV4Um9sZUFybj86IHN0cmluZztcbiAgcmVhZG9ubHkgZnVuY3Rpb246IHN0cmluZztcbiAgcmVhZG9ubHkgcmVzb3VyY2VBcm4/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBvbGljeT86IG9iamVjdDtcbn1cbi8qKlxuICogQWRkcyBcImFjdGlvblwiIGZ1bmN0aW9uYWxpdHkgdG8gdGhlIFBvbGljeSBTdGF0ZW1lbnRcbiAqXG4gKiBAaGlkZWNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBjbGFzcyBMZXhJbXBvcnRDdXN0b21SZXNvdXJjZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBsYW1iZGE6IGxhbWJkYS5JRnVuY3Rpb247XG4gIHB1YmxpYyByZWFkb25seSBsZXhJbXBvcnQ6IEN1c3RvbVJlc291cmNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHNjb3BlOiBDb25zdHJ1Y3QsXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwcm9wczogTGV4SW1wb3J0Q3VzdG9tUmVzb3VyY2VQcm9wcyxcbiAgKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICB0aGlzLmxhbWJkYSA9IHRoaXMuZW5zdXJlTGFtYmRhKCk7XG5cbiAgICBpZiAocHJvcHMubGV4WmlwQnVja2V0KSB7XG4gICAgICBwcm9wcy5sZXhaaXBCdWNrZXQuZ3JhbnRSZWFkKHRoaXMubGFtYmRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBMZXhJbXBvcnRQcm92aWRlciA9IG5ldyBjci5Qcm92aWRlcih0aGlzLCAnTGV4SW1wb3J0UHJvdmlkZXInLCB7XG4gICAgICBvbkV2ZW50SGFuZGxlcjogdGhpcy5sYW1iZGEsXG4gICAgfSk7XG5cbiAgICBjb25zdCBsZXhQcm9wcyA9IHtcbiAgICAgIHVpZDogcHJvcHMudWlkLFxuICAgICAgbGV4WmlwQnVja2V0OiBwcm9wcy5sZXhaaXBCdWNrZXQ/LmJ1Y2tldE5hbWUsXG4gICAgICBsZXhSb2xlQXJuOiBwcm9wcy5sZXhSb2xlQXJuLFxuICAgICAgZnVuY3Rpb246IHByb3BzLmZ1bmN0aW9uLFxuICAgICAgcmVzb3VyY2VBcm46IHByb3BzLnJlc291cmNlQXJuLFxuICAgICAgcG9saWN5OiBKU09OLnN0cmluZ2lmeShwcm9wcy5wb2xpY3kpLFxuICAgIH07XG5cbiAgICB0aGlzLmxleEltcG9ydCA9IG5ldyBDdXN0b21SZXNvdXJjZSh0aGlzLCAnTGV4SW1wb3J0Q3VzdG9tUmVzb3VyY2UnLCB7XG4gICAgICBzZXJ2aWNlVG9rZW46IExleEltcG9ydFByb3ZpZGVyLnNlcnZpY2VUb2tlbixcbiAgICAgIHByb3BlcnRpZXM6IGxleFByb3BzLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVMYW1iZGEoKTogbGFtYmRhLkZ1bmN0aW9uIHtcbiAgICBjb25zdCBzdGFjayA9IGNkay5TdGFjay5vZih0aGlzKTtcbiAgICBjb25zdCBjb25zdHJ1Y3ROYW1lID0gJ0xleEltcG9ydEN1c3RvbVJlc291cmNlJztcbiAgICBjb25zdCBleGlzdGluZyA9IHN0YWNrLm5vZGUudHJ5RmluZENoaWxkKGNvbnN0cnVjdE5hbWUpO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgcmV0dXJuIGV4aXN0aW5nIGFzIGxhbWJkYS5GdW5jdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBsZXhDdXN0b21SZXNvdXJjZVJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ2xleEN1c3RvbVJlc291cmNlUm9sZScsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdsYW1iZGEuYW1hem9uYXdzLmNvbScpLFxuICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgWydsYW1iZGFQb2xpY3knXTogbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICAgICAgc3RhdGVtZW50czogW1xuICAgICAgICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVTbG90JyxcbiAgICAgICAgICAgICAgICAnbGV4Okxpc3RCb3RzJyxcbiAgICAgICAgICAgICAgICAnbGV4OlVwZGF0ZUJvdEFsaWFzJyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZUN1c3RvbVZvY2FidWxhcnknLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlQm90VmVyc2lvbicsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVCb3RDaGFubmVsJyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZVJlc291cmNlUG9saWN5JyxcbiAgICAgICAgICAgICAgICAnbGV4OlVwZGF0ZUJvdExvY2FsZScsXG4gICAgICAgICAgICAgICAgJ2xleDpMaXN0Qm90QWxpYXNlcycsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVDdXN0b21Wb2NhYnVsYXJ5JyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZUJvdExvY2FsZScsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVJbnRlbnQnLFxuICAgICAgICAgICAgICAgICdsZXg6U3RhcnRJbXBvcnQnLFxuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlU2xvdFR5cGUnLFxuICAgICAgICAgICAgICAgICdsZXg6QnVpbGRCb3RMb2NhbGUnLFxuICAgICAgICAgICAgICAgICdsZXg6Q3JlYXRlQm90JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZUJvdEFsaWFzJyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZUludGVudCcsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVVcGxvYWRVcmwnLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlQm90JyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZUJvdEFsaWFzJyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZVNsb3RUeXBlJyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZUJvdExvY2FsZScsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVDdXN0b21Wb2NhYnVsYXJ5JyxcbiAgICAgICAgICAgICAgICAnbGV4OlVwZGF0ZVJlc291cmNlUG9saWN5JyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZVNsb3QnLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlU2xvdCcsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVCb3QnLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlU2xvdFR5cGUnLFxuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlSW50ZW50JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZVJlc291cmNlUG9saWN5JyxcbiAgICAgICAgICAgICAgICAnaWFtOlBhc3NSb2xlJyxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICAgICAgJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnLFxuICAgICAgICApLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbihzdGFjaywgY29uc3RydWN0TmFtZSwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuUFlUSE9OXzNfOSxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcmVzb3VyY2VzJykpLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgYXJjaGl0ZWN0dXJlOiBsYW1iZGEuQXJjaGl0ZWN0dXJlLkFSTV82NCxcbiAgICAgIHJvbGU6IGxleEN1c3RvbVJlc291cmNlUm9sZSxcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5taW51dGVzKDEpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZuO1xuICB9XG59XG4iXX0=