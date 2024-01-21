import { App, Stack, StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lexupload from 'cdk-lex-zip-import';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

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

    const bot = new lexupload.ImportBot(this, 'lexBot', {
      sourceDirectory: './resources/LexBot',
      lexRoleArn: lexRole.roleArn,
    });

    const resourceArn = `arn:aws:lex:${this.region}:${this.account}:bot-alias/${bot.botId}/${bot.botAliasId}`;
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'AllowChimePstnAudioUseBot',
          Effect: 'Allow',
          Principal: { Service: 'voiceconnector.chime.amazonaws.com' },
          Action: 'lex:StartConversation',
          Resource: resourceArn,
          Condition: {
            StringEquals: { 'AWS:SourceAccount': `${this.account}` },
            ArnEquals: {
              'AWS:SourceArn': `arn:aws:voiceconnector:us-east-1:${this.account}:*`,
            },
          },
        },
      ],
    };
    bot.addResourcePolicy(resourceArn, policy);
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();
