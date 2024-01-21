import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
interface LexProps extends StackProps {
}
export declare class Lex extends Stack {
    readonly lexBotId: string;
    readonly lexBotAliasId: string;
    constructor(scope: Construct, id: string, props: LexProps);
}
export {};
