# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ImportBot <a name="ImportBot" id="cdk-lex-zip-import.ImportBot"></a>

#### Initializers <a name="Initializers" id="cdk-lex-zip-import.ImportBot.Initializer"></a>

```typescript
import { ImportBot } from 'cdk-lex-zip-import'

new ImportBot(scope: Construct, id: string, props: LexBotProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lex-zip-import.ImportBot.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.ImportBot.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.ImportBot.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-lex-zip-import.LexBotProps">LexBotProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-lex-zip-import.ImportBot.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-lex-zip-import.ImportBot.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-lex-zip-import.ImportBot.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-lex-zip-import.LexBotProps">LexBotProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lex-zip-import.ImportBot.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-lex-zip-import.ImportBot.addResourcePolicy">addResourcePolicy</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdk-lex-zip-import.ImportBot.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addResourcePolicy` <a name="addResourcePolicy" id="cdk-lex-zip-import.ImportBot.addResourcePolicy"></a>

```typescript
public addResourcePolicy(resourceArn: string, policy: object): LexImportCustomResource
```

###### `resourceArn`<sup>Required</sup> <a name="resourceArn" id="cdk-lex-zip-import.ImportBot.addResourcePolicy.parameter.resourceArn"></a>

- *Type:* string

---

###### `policy`<sup>Required</sup> <a name="policy" id="cdk-lex-zip-import.ImportBot.addResourcePolicy.parameter.policy"></a>

- *Type:* object

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lex-zip-import.ImportBot.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-lex-zip-import.ImportBot.isConstruct"></a>

```typescript
import { ImportBot } from 'cdk-lex-zip-import'

ImportBot.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-lex-zip-import.ImportBot.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lex-zip-import.ImportBot.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-lex-zip-import.ImportBot.property.botAliasId">botAliasId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.ImportBot.property.botId">botId</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-lex-zip-import.ImportBot.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `botAliasId`<sup>Required</sup> <a name="botAliasId" id="cdk-lex-zip-import.ImportBot.property.botAliasId"></a>

```typescript
public readonly botAliasId: string;
```

- *Type:* string

---

##### `botId`<sup>Required</sup> <a name="botId" id="cdk-lex-zip-import.ImportBot.property.botId"></a>

```typescript
public readonly botId: string;
```

- *Type:* string

---


### LexImportCustomResource <a name="LexImportCustomResource" id="cdk-lex-zip-import.LexImportCustomResource"></a>

Adds "action" functionality to the Policy Statement.

#### Initializers <a name="Initializers" id="cdk-lex-zip-import.LexImportCustomResource.Initializer"></a>

```typescript
import { LexImportCustomResource } from 'cdk-lex-zip-import'

new LexImportCustomResource(scope: Construct, id: string, props: LexImportCustomResourceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps">LexImportCustomResourceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-lex-zip-import.LexImportCustomResource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-lex-zip-import.LexImportCustomResource.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-lex-zip-import.LexImportCustomResource.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-lex-zip-import.LexImportCustomResourceProps">LexImportCustomResourceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-lex-zip-import.LexImportCustomResource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-lex-zip-import.LexImportCustomResource.isConstruct"></a>

```typescript
import { LexImportCustomResource } from 'cdk-lex-zip-import'

LexImportCustomResource.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-lex-zip-import.LexImportCustomResource.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.property.lambda">lambda</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResource.property.lexImport">lexImport</a></code> | <code>aws-cdk-lib.CustomResource</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-lex-zip-import.LexImportCustomResource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `lambda`<sup>Required</sup> <a name="lambda" id="cdk-lex-zip-import.LexImportCustomResource.property.lambda"></a>

```typescript
public readonly lambda: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

---

##### `lexImport`<sup>Required</sup> <a name="lexImport" id="cdk-lex-zip-import.LexImportCustomResource.property.lexImport"></a>

```typescript
public readonly lexImport: CustomResource;
```

- *Type:* aws-cdk-lib.CustomResource

---


## Structs <a name="Structs" id="Structs"></a>

### LexBotProps <a name="LexBotProps" id="cdk-lex-zip-import.LexBotProps"></a>

Props for `ImportBot`.

#### Initializer <a name="Initializer" id="cdk-lex-zip-import.LexBotProps.Initializer"></a>

```typescript
import { LexBotProps } from 'cdk-lex-zip-import'

const lexBotProps: LexBotProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lex-zip-import.LexBotProps.property.lexRoleArn">lexRoleArn</a></code> | <code>string</code> | ARN for IAM Role associated with Lex Bot (required). |
| <code><a href="#cdk-lex-zip-import.LexBotProps.property.sourceDirectory">sourceDirectory</a></code> | <code>string</code> | Zip File location (required). |

---

##### `lexRoleArn`<sup>Required</sup> <a name="lexRoleArn" id="cdk-lex-zip-import.LexBotProps.property.lexRoleArn"></a>

```typescript
public readonly lexRoleArn: string;
```

- *Type:* string
- *Default:* None

ARN for IAM Role associated with Lex Bot (required).

---

##### `sourceDirectory`<sup>Required</sup> <a name="sourceDirectory" id="cdk-lex-zip-import.LexBotProps.property.sourceDirectory"></a>

```typescript
public readonly sourceDirectory: string;
```

- *Type:* string
- *Default:* None

Zip File location (required).

---

### LexImportCustomResourceProps <a name="LexImportCustomResourceProps" id="cdk-lex-zip-import.LexImportCustomResourceProps"></a>

#### Initializer <a name="Initializer" id="cdk-lex-zip-import.LexImportCustomResourceProps.Initializer"></a>

```typescript
import { LexImportCustomResourceProps } from 'cdk-lex-zip-import'

const lexImportCustomResourceProps: LexImportCustomResourceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.account">account</a></code> | <code>string</code> | The AWS account ID this resource belongs to. |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.environmentFromArn">environmentFromArn</a></code> | <code>string</code> | ARN to deduce region and account from. |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.physicalName">physicalName</a></code> | <code>string</code> | The value passed in by users to the physical name prop of the resource. |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.region">region</a></code> | <code>string</code> | The AWS region this resource belongs to. |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.function">function</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.uid">uid</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.lexRoleArn">lexRoleArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.lexZipBucket">lexZipBucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.policy">policy</a></code> | <code>object</code> | *No description.* |
| <code><a href="#cdk-lex-zip-import.LexImportCustomResourceProps.property.resourceArn">resourceArn</a></code> | <code>string</code> | *No description.* |

---

##### `account`<sup>Optional</sup> <a name="account" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string
- *Default:* the resource is in the same account as the stack it belongs to

The AWS account ID this resource belongs to.

---

##### `environmentFromArn`<sup>Optional</sup> <a name="environmentFromArn" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.environmentFromArn"></a>

```typescript
public readonly environmentFromArn: string;
```

- *Type:* string
- *Default:* take environment from `account`, `region` parameters, or use Stack environment.

ARN to deduce region and account from.

The ARN is parsed and the account and region are taken from the ARN.
This should be used for imported resources.

Cannot be supplied together with either `account` or `region`.

---

##### `physicalName`<sup>Optional</sup> <a name="physicalName" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.physicalName"></a>

```typescript
public readonly physicalName: string;
```

- *Type:* string
- *Default:* The physical name will be allocated by CloudFormation at deployment time

The value passed in by users to the physical name prop of the resource.

`undefined` implies that a physical name will be allocated by
   CloudFormation during deployment.
- a concrete value implies a specific physical name
- `PhysicalName.GENERATE_IF_NEEDED` is a marker that indicates that a physical will only be generated
   by the CDK if it is needed for cross-environment references. Otherwise, it will be allocated by CloudFormation.

---

##### `region`<sup>Optional</sup> <a name="region" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string
- *Default:* the resource is in the same region as the stack it belongs to

The AWS region this resource belongs to.

---

##### `function`<sup>Required</sup> <a name="function" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.function"></a>

```typescript
public readonly function: string;
```

- *Type:* string

---

##### `uid`<sup>Required</sup> <a name="uid" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.uid"></a>

```typescript
public readonly uid: string;
```

- *Type:* string

---

##### `lexRoleArn`<sup>Optional</sup> <a name="lexRoleArn" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.lexRoleArn"></a>

```typescript
public readonly lexRoleArn: string;
```

- *Type:* string

---

##### `lexZipBucket`<sup>Optional</sup> <a name="lexZipBucket" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.lexZipBucket"></a>

```typescript
public readonly lexZipBucket: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `policy`<sup>Optional</sup> <a name="policy" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.policy"></a>

```typescript
public readonly policy: object;
```

- *Type:* object

---

##### `resourceArn`<sup>Optional</sup> <a name="resourceArn" id="cdk-lex-zip-import.LexImportCustomResourceProps.property.resourceArn"></a>

```typescript
public readonly resourceArn: string;
```

- *Type:* string

---



