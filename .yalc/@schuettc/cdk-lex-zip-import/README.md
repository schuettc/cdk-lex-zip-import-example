# cdk-lex-zip-import

![Experimental](https://img.shields.io/badge/experimental-important.svg?style=for-the-badge)

An AWS Cloud Development Kit (AWS CDK) construct library that allows you to upload and deploy a Zipped Lex Bot

## Usage

To add to your AWS CDK package.json file:

```
yarn add cdk-lex-zip-import
```

Within your AWS CDK:

### Import Lex Bot

```typescript
const bot = new lexupload.Bot(this, 'lexBot', {
  sourceDirectory: './resources/LexBot',
  lexRoleArn: lexRole.roleArn,
});
```

The `sourceDirecotry` must include a file named `LexBot.zip`. All files in that directory will be uploaded, but only a file named `LexBot.zip` will be imported to Lex as a Bot.

The `lexRoleArn` refers to the roleArn of an IAM Role. For example:

```typescript
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
```

### Adding a Resource Policy

```ts
const sipMediaApp = new chime.ChimeSipMediaApp(this, 'sipMediaApp', {
  region: this.region,
  endpoint: smaHandler.functionArn,
});
```

The SIP media application created will use the smaHandler referenced by the endpoint in the same region the AWS CDK is being deployed in. The SIP media application must be created in the same region as the associated Lambda endpoint and must be in `us-east-1` or `us-west-2`.

### SIP Media Application Rule Creation

```ts
const sipRule = new chime.ChimeSipRule(this, 'sipRule', {
  triggerType: chime.TriggerType.TO_PHONE_NUMBER,
  triggerValue: phoneNumber.phoneNumber,
  targetApplications: [
    {
      region: this.region,
      priority: 1,
      sipMediaApplicationId: sipMediaApp.sipMediaAppId,
    },
  ],
});
```

The SIP rule will assocaite the previously created phone number with the previously created SIP media application. The SIP rule can be associated with either an E.164 number or Amazon Chime Voice Connector URI. If the TriggerType is `TO_PHONE_NUMBER`, the TriggerValue must be an E.164 number. If the TriggerType is `REQUEST_URI_HOSTNAME`, the TriggerValue must be an Amazon Chime Voice Connector URI. A priority must be assigned with a value between 1 and 25 inclusive. A targetApplication is required. This will associate the trigger to the SIP media application and associated Lambda.

### Voice Connector Creation

Using a phone number created with Product Type of VC:

```ts
const voiceConnector = new chime.ChimeVoiceConnector(this, 'voiceConnector', {
  encryption: true,
  name: 'string',
  region: 'us-east-1',
  termination: {
    terminationCidrs: ['198.51.100.10/32'],
    callingRegions: ['US'],
  },
  origination: [
    {
      host: '198.51.100.10',
      port: 5061,
      protocol: chime.Protocol.TCP,
      priority: 1,
      weight: 1,
    },
  ],
  streaming: {
    enabled: true,
    dataRetention: 0,
    notificationTargets: [chime.NotificationTargetType.EVENTBRIDGE],
  },
});
```

This will create an Amazon Chime Voice Connector with specified options. Termination, origination, and streaming are all optional.

```ts
voiceConnectorPhone.associateWithVoiceConnector(voiceConnector);
```

This will assocaite the previously created phone number with the voice connector.

## Not Supported Yet

This is a work in progress.

Features that are not supported yet:

- [ ] Amazon Chime Voice Connector Groups
- [ ] Amazon Chime Voice Connector Logging
- [ ] Amazon Chime Voice Connector Emergency Calling
- [ ] Updates to created resources

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for more information.

## License

This project is licensed under the Apache-2.0 License.
