import { Construct } from 'constructs';
import { LexImportCustomResource } from './customResource';
/**
 * Props for `ImportBot`.
 */
export interface LexBotProps {
    /**
     * Zip File location (required)
     *    @default - None
     */
    readonly sourceDirectory: string;
    /**
     * ARN for IAM Role associated with Lex Bot (required)
     *    @default - None
     */
    readonly lexRoleArn: string;
}
export declare class ImportBot extends Construct {
    readonly botId: string;
    readonly botAliasId: string;
    constructor(scope: Construct, id: string, props: LexBotProps);
    addResourcePolicy(resourceArn: string, policy: object): LexImportCustomResource;
}
