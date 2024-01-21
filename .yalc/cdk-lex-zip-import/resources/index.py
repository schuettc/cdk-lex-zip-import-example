import addResourcePolicy
import importBot


def handler(event, context):
    print(event)
    responseData = {}
    uid = event["ResourceProperties"]["uid"]
    function = event["ResourceProperties"]["function"]
    if event["RequestType"] == "Create":
        if function == "importBot":
            try:
                lex_role_arn = event["ResourceProperties"]["lexRoleArn"]
                zip_bucket = event["ResourceProperties"]["lexZipBucket"]
                responseData = importBot.create_bot(uid, lex_role_arn, zip_bucket)
                return {"PhysicalResourceId": uid, "Data": responseData}
            except Exception as e:
                error = {"error": f"Exception thrown: {e}"}
                print(error)
                raise Exception(error)
        if function == "addResourcePolicy":
            try:
                resource_arn = event["ResourceProperties"]["resourceArn"]
                policy = event["ResourceProperties"]["policy"]
                responseData = addResourcePolicy.put_resource_policy(resource_arn, policy)
                return {"PhysicalResourceId": uid, "Data": responseData}
            except Exception as e:
                error = {"error": f"Exception thrown: {e}"}
                print(error)
                raise Exception(error)

    elif event["RequestType"] == "Delete":
        if function == "importBot":
            try:
                responseData = importBot.delete_bot(uid)
                return {"Data": responseData}
            except Exception as e:
                error = {"error": f"Exception thrown: {e}"}
                print(error)
                raise Exception(error)

    else:
        responseData = {"Message": "Update is no-op. Returning success status."}
        return {"PhysicalResourceId": uid, "Data": responseData}
