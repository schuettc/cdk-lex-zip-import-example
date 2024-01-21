"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportBot = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const customResource_1 = require("./customResource");
const s3upload_1 = require("./s3upload");
class ImportBot extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const uid = cdk.Names.uniqueId(this);
        const upload = new s3upload_1.S3Upload(this, 'lexZipBucket', {
            sourceDirectory: props.sourceDirectory,
        });
        const lexBotImport = new customResource_1.LexImportCustomResource(this, 'LexBotImport', {
            uid: uid,
            lexZipBucket: upload.lexZipBucket,
            lexRoleArn: props.lexRoleArn,
            function: 'importBot',
        });
        lexBotImport.node.addDependency(upload);
        this.botId = lexBotImport.lexImport.getAttString('bot_id');
        this.botAliasId = lexBotImport.lexImport.getAttString('bot_alias_id');
    }
    addResourcePolicy(resourceArn, policy) {
        const result = new customResource_1.LexImportCustomResource(this, 'resourcePolicyAssociation', {
            resourceArn,
            policy,
            uid: cdk.Names.uniqueId(this),
            function: 'addResourcePolicy',
        });
        return result;
    }
}
exports.ImportBot = ImportBot;
_a = JSII_RTTI_SYMBOL_1;
ImportBot[_a] = { fqn: "cdk-lex-zip-import.ImportBot", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV4Ym90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xleGJvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUFtQztBQUNuQywyQ0FBdUM7QUFDdkMscURBQTJEO0FBQzNELHlDQUFzQztBQWlCdEMsTUFBYSxTQUFVLFNBQVEsc0JBQVM7SUFJdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sR0FBRyxHQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ2hELGVBQWUsRUFBRSxLQUFLLENBQUMsZUFBZTtTQUN2QyxDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLHdDQUF1QixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDckUsR0FBRyxFQUFFLEdBQUc7WUFDUixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDakMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO1lBQzVCLFFBQVEsRUFBRSxXQUFXO1NBQ3RCLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsaUJBQWlCLENBQUMsV0FBbUIsRUFBRSxNQUFjO1FBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksd0NBQXVCLENBQ3hDLElBQUksRUFDSiwyQkFBMkIsRUFDM0I7WUFDRSxXQUFXO1lBQ1gsTUFBTTtZQUNOLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0IsUUFBUSxFQUFFLG1CQUFtQjtTQUM5QixDQUNGLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztBQXJDSCw4QkFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBMZXhJbXBvcnRDdXN0b21SZXNvdXJjZSB9IGZyb20gJy4vY3VzdG9tUmVzb3VyY2UnO1xuaW1wb3J0IHsgUzNVcGxvYWQgfSBmcm9tICcuL3MzdXBsb2FkJztcbi8qKlxuICogUHJvcHMgZm9yIGBJbXBvcnRCb3RgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExleEJvdFByb3BzIHtcbiAgLyoqXG4gICAqIFppcCBGaWxlIGxvY2F0aW9uIChyZXF1aXJlZClcbiAgICogICAgQGRlZmF1bHQgLSBOb25lXG4gICAqL1xuICByZWFkb25seSBzb3VyY2VEaXJlY3Rvcnk6IHN0cmluZztcbiAgLyoqXG4gICAqIEFSTiBmb3IgSUFNIFJvbGUgYXNzb2NpYXRlZCB3aXRoIExleCBCb3QgKHJlcXVpcmVkKVxuICAgKiAgICBAZGVmYXVsdCAtIE5vbmVcbiAgICovXG4gIHJlYWRvbmx5IGxleFJvbGVBcm46IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEltcG9ydEJvdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBib3RJZDogc3RyaW5nO1xuICBwdWJsaWMgcmVhZG9ubHkgYm90QWxpYXNJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBMZXhCb3RQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCB1aWQ6IHN0cmluZyA9IGNkay5OYW1lcy51bmlxdWVJZCh0aGlzKTtcblxuICAgIGNvbnN0IHVwbG9hZCA9IG5ldyBTM1VwbG9hZCh0aGlzLCAnbGV4WmlwQnVja2V0Jywge1xuICAgICAgc291cmNlRGlyZWN0b3J5OiBwcm9wcy5zb3VyY2VEaXJlY3RvcnksXG4gICAgfSk7XG5cbiAgICBjb25zdCBsZXhCb3RJbXBvcnQgPSBuZXcgTGV4SW1wb3J0Q3VzdG9tUmVzb3VyY2UodGhpcywgJ0xleEJvdEltcG9ydCcsIHtcbiAgICAgIHVpZDogdWlkLFxuICAgICAgbGV4WmlwQnVja2V0OiB1cGxvYWQubGV4WmlwQnVja2V0LFxuICAgICAgbGV4Um9sZUFybjogcHJvcHMubGV4Um9sZUFybixcbiAgICAgIGZ1bmN0aW9uOiAnaW1wb3J0Qm90JyxcbiAgICB9KTtcblxuICAgIGxleEJvdEltcG9ydC5ub2RlLmFkZERlcGVuZGVuY3kodXBsb2FkKTtcblxuICAgIHRoaXMuYm90SWQgPSBsZXhCb3RJbXBvcnQubGV4SW1wb3J0LmdldEF0dFN0cmluZygnYm90X2lkJyk7XG4gICAgdGhpcy5ib3RBbGlhc0lkID0gbGV4Qm90SW1wb3J0LmxleEltcG9ydC5nZXRBdHRTdHJpbmcoJ2JvdF9hbGlhc19pZCcpO1xuICB9XG4gIGFkZFJlc291cmNlUG9saWN5KHJlc291cmNlQXJuOiBzdHJpbmcsIHBvbGljeTogb2JqZWN0KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IExleEltcG9ydEN1c3RvbVJlc291cmNlKFxuICAgICAgdGhpcyxcbiAgICAgICdyZXNvdXJjZVBvbGljeUFzc29jaWF0aW9uJyxcbiAgICAgIHtcbiAgICAgICAgcmVzb3VyY2VBcm4sXG4gICAgICAgIHBvbGljeSxcbiAgICAgICAgdWlkOiBjZGsuTmFtZXMudW5pcXVlSWQodGhpcyksXG4gICAgICAgIGZ1bmN0aW9uOiAnYWRkUmVzb3VyY2VQb2xpY3knLFxuICAgICAgfSxcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==