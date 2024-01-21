"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lex = void 0;
const path = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
const lambda = require("aws-cdk-lib/aws-lambda");
const cr = require("aws-cdk-lib/custom-resources");
class Lex extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
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
        const lexRole = new iam.Role(this, 'lexRole', {
            assumedBy: new iam.ServicePrincipal('lex.amazonaws.com'),
            inlinePolicies: {
                ['lexPolicy']: new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            resources: ['*'],
                            actions: ['polly:SynthesizeSpeech', 'comprehend:DetectSentiment'],
                        }),
                    ],
                }),
            },
        });
        const lexDeployLambda = new lambda.Function(this, 'lexDeployLambda', {
            runtime: lambda.Runtime.PYTHON_3_9,
            code: lambda.Code.fromAsset(path.join(__dirname, '../resources/lexBot')),
            handler: 'index.handler',
            architecture: lambda.Architecture.ARM_64,
            timeout: aws_cdk_lib_1.Duration.minutes(1),
            role: lexCustomResourceRole,
        });
        const uid = aws_cdk_lib_1.Names.uniqueId(this);
        const LexResourceProvider = new cr.Provider(this, 'LexResourceProvider', {
            onEventHandler: lexDeployLambda,
        });
        const lexBot = new aws_cdk_lib_1.CustomResource(this, 'LexCustomResource', {
            serviceToken: LexResourceProvider.serviceToken,
            properties: { uid: uid, lex_role_arn: lexRole.roleArn },
        });
        new aws_cdk_lib_1.CfnOutput(this, 'bot_id', { value: lexBot.getAttString('bot_id') });
        new aws_cdk_lib_1.CfnOutput(this, 'bot_alias_id', {
            value: lexBot.getAttString('bot_alias_id'),
        });
        this.lexBotId = lexBot.getAttString('bot_id');
        this.lexBotAliasId = lexBot.getAttString('bot_alias_id');
    }
}
exports.Lex = Lex;
const devEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
const app = new aws_cdk_lib_1.App();
new Lex(app, 'LexDeploy', { env: devEnv });
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUE2QjtBQUM3Qiw2Q0FRcUI7QUFDckIsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUNqRCxtREFBbUQ7QUFLbkQsTUFBYSxHQUFJLFNBQVEsbUJBQUs7SUFJNUIsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFlO1FBQ3ZELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUN4RSxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUM7WUFDM0QsY0FBYyxFQUFFO2dCQUNkLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDO29CQUN2QyxVQUFVLEVBQUU7d0JBQ1YsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDOzRCQUN0QixTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7NEJBQ2hCLE9BQU8sRUFBRTtnQ0FDUCxnQkFBZ0I7Z0NBQ2hCLGNBQWM7Z0NBQ2Qsb0JBQW9CO2dDQUNwQiw0QkFBNEI7Z0NBQzVCLHNCQUFzQjtnQ0FDdEIsc0JBQXNCO2dDQUN0QiwwQkFBMEI7Z0NBQzFCLHFCQUFxQjtnQ0FDckIsb0JBQW9CO2dDQUNwQiw0QkFBNEI7Z0NBQzVCLHFCQUFxQjtnQ0FDckIsa0JBQWtCO2dDQUNsQixpQkFBaUI7Z0NBQ2pCLG9CQUFvQjtnQ0FDcEIsb0JBQW9CO2dDQUNwQixlQUFlO2dDQUNmLG9CQUFvQjtnQ0FDcEIsa0JBQWtCO2dDQUNsQixxQkFBcUI7Z0NBQ3JCLGVBQWU7Z0NBQ2Ysb0JBQW9CO2dDQUNwQixvQkFBb0I7Z0NBQ3BCLHFCQUFxQjtnQ0FDckIsNEJBQTRCO2dDQUM1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QUksR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUUzQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtcbiAgQXBwLFxuICBTdGFjayxcbiAgU3RhY2tQcm9wcyxcbiAgRHVyYXRpb24sXG4gIEN1c3RvbVJlc291cmNlLFxuICBOYW1lcyxcbiAgQ2ZuT3V0cHV0LFxufSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBjciBmcm9tICdhd3MtY2RrLWxpYi9jdXN0b20tcmVzb3VyY2VzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5pbnRlcmZhY2UgTGV4UHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHt9XG5cbmV4cG9ydCBjbGFzcyBMZXggZXh0ZW5kcyBTdGFjayB7XG4gIHB1YmxpYyByZWFkb25seSBsZXhCb3RJZDogc3RyaW5nO1xuICBwdWJsaWMgcmVhZG9ubHkgbGV4Qm90QWxpYXNJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBMZXhQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgbGV4Q3VzdG9tUmVzb3VyY2VSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdsZXhDdXN0b21SZXNvdXJjZVJvbGUnLCB7XG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFsnbGFtYmRhUG9saWN5J106IG5ldyBpYW0uUG9saWN5RG9jdW1lbnQoe1xuICAgICAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlU2xvdCcsXG4gICAgICAgICAgICAgICAgJ2xleDpMaXN0Qm90cycsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVCb3RBbGlhcycsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVDdXN0b21Wb2NhYnVsYXJ5JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZUJvdFZlcnNpb24nLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlQm90Q2hhbm5lbCcsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVSZXNvdXJjZVBvbGljeScsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVCb3RMb2NhbGUnLFxuICAgICAgICAgICAgICAgICdsZXg6TGlzdEJvdEFsaWFzZXMnLFxuICAgICAgICAgICAgICAgICdsZXg6Q3JlYXRlQ3VzdG9tVm9jYWJ1bGFyeScsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVCb3RMb2NhbGUnLFxuICAgICAgICAgICAgICAgICdsZXg6RGVsZXRlSW50ZW50JyxcbiAgICAgICAgICAgICAgICAnbGV4OlN0YXJ0SW1wb3J0JyxcbiAgICAgICAgICAgICAgICAnbGV4OlVwZGF0ZVNsb3RUeXBlJyxcbiAgICAgICAgICAgICAgICAnbGV4OkJ1aWxkQm90TG9jYWxlJyxcbiAgICAgICAgICAgICAgICAnbGV4OkNyZWF0ZUJvdCcsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVCb3RBbGlhcycsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVJbnRlbnQnLFxuICAgICAgICAgICAgICAgICdsZXg6Q3JlYXRlVXBsb2FkVXJsJyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZUJvdCcsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVCb3RBbGlhcycsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVTbG90VHlwZScsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVCb3RMb2NhbGUnLFxuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlQ3VzdG9tVm9jYWJ1bGFyeScsXG4gICAgICAgICAgICAgICAgJ2xleDpVcGRhdGVSZXNvdXJjZVBvbGljeScsXG4gICAgICAgICAgICAgICAgJ2xleDpDcmVhdGVTbG90JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZVNsb3QnLFxuICAgICAgICAgICAgICAgICdsZXg6VXBkYXRlQm90JyxcbiAgICAgICAgICAgICAgICAnbGV4OkRlbGV0ZVNsb3RUeXBlJyxcbiAgICAgICAgICAgICAgICAnbGV4OlVwZGF0ZUludGVudCcsXG4gICAgICAgICAgICAgICAgJ2xleDpEZWxldGVSZXNvdXJjZVBvbGljeScsXG4gICAgICAgICAgICAgICAgJ2lhbTpQYXNzUm9sZScsXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFxuICAgICAgICAgICdzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlJyxcbiAgICAgICAgKSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBsZXhSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdsZXhSb2xlJywge1xuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2xleC5hbWF6b25hd3MuY29tJyksXG4gICAgICBpbmxpbmVQb2xpY2llczoge1xuICAgICAgICBbJ2xleFBvbGljeSddOiBuZXcgaWFtLlBvbGljeURvY3VtZW50KHtcbiAgICAgICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgICAgICAgIGFjdGlvbnM6IFsncG9sbHk6U3ludGhlc2l6ZVNwZWVjaCcsICdjb21wcmVoZW5kOkRldGVjdFNlbnRpbWVudCddLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgXSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgbGV4RGVwbG95TGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnbGV4RGVwbG95TGFtYmRhJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuUFlUSE9OXzNfOSxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcmVzb3VyY2VzL2xleEJvdCcpKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGFyY2hpdGVjdHVyZTogbGFtYmRhLkFyY2hpdGVjdHVyZS5BUk1fNjQsXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5taW51dGVzKDEpLFxuICAgICAgcm9sZTogbGV4Q3VzdG9tUmVzb3VyY2VSb2xlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdWlkOiBzdHJpbmcgPSBOYW1lcy51bmlxdWVJZCh0aGlzKTtcblxuICAgIGNvbnN0IExleFJlc291cmNlUHJvdmlkZXIgPSBuZXcgY3IuUHJvdmlkZXIodGhpcywgJ0xleFJlc291cmNlUHJvdmlkZXInLCB7XG4gICAgICBvbkV2ZW50SGFuZGxlcjogbGV4RGVwbG95TGFtYmRhLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbGV4Qm90ID0gbmV3IEN1c3RvbVJlc291cmNlKHRoaXMsICdMZXhDdXN0b21SZXNvdXJjZScsIHtcbiAgICAgIHNlcnZpY2VUb2tlbjogTGV4UmVzb3VyY2VQcm92aWRlci5zZXJ2aWNlVG9rZW4sXG4gICAgICBwcm9wZXJ0aWVzOiB7IHVpZDogdWlkLCBsZXhfcm9sZV9hcm46IGxleFJvbGUucm9sZUFybiB9LFxuICAgIH0pO1xuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnYm90X2lkJywgeyB2YWx1ZTogbGV4Qm90LmdldEF0dFN0cmluZygnYm90X2lkJykgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnYm90X2FsaWFzX2lkJywge1xuICAgICAgdmFsdWU6IGxleEJvdC5nZXRBdHRTdHJpbmcoJ2JvdF9hbGlhc19pZCcpLFxuICAgIH0pO1xuXG4gICAgdGhpcy5sZXhCb3RJZCA9IGxleEJvdC5nZXRBdHRTdHJpbmcoJ2JvdF9pZCcpO1xuICAgIHRoaXMubGV4Qm90QWxpYXNJZCA9IGxleEJvdC5nZXRBdHRTdHJpbmcoJ2JvdF9hbGlhc19pZCcpO1xuICB9XG59XG5cbmNvbnN0IGRldkVudiA9IHtcbiAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9SRUdJT04sXG59O1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5cbm5ldyBMZXgoYXBwLCAnTGV4RGVwbG95JywgeyBlbnY6IGRldkVudiB9KTtcblxuYXBwLnN5bnRoKCk7XG4iXX0=