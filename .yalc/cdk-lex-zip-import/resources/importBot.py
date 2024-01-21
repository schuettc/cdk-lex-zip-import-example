import boto3
import time
import logging
import os
from botocore.config import Config
import urllib3
import json

region = os.environ["AWS_REGION"]

logger = logging.getLogger()
try:
    log_level = os.environ["LogLevel"]
    if log_level not in ["INFO", "DEBUG"]:
        log_level = "INFO"
except:
    log_level = "INFO"

logger.setLevel(log_level)

lex = boto3.client("lexv2-models")
s3 = boto3.client("s3")


def download_zip(bucket_name):
    logger.info("Downloading LexBot.zip file from %s", bucket_name)
    try:
        s3.download_file(bucket_name, "LexBot.zip", "/tmp/LexBot.zip")
    except Exception as e:
        error = {"error": f"Exception thrown: {e}"}
        print(error)
        raise Exception(error)


def get_bot_id(bot_name):
    logger.info("Getting Bot ID")
    filters = [
        {
            "name": "BotName",
            "values": [bot_name],
            "operator": "EQ",
        }
    ]
    response = lex.list_bots(filters=filters)
    logger.info(response)
    bots = response.get("botSummaries", [])
    if not bots:
        raise RuntimeError("Could not find bot")

    bot_id = bots[0].get("botId")
    return bot_id


def get_bot_alias_id(bot_id):
    logger.info("Getting Bot Alias ID")
    bot_alias_id = lex.list_bot_aliases(
        botId=bot_id,
        maxResults=1,
    )[
        "botAliasSummaries"
    ][0]["botAliasId"]
    logger.info("Bot Alias ID: %s", bot_alias_id)
    return bot_alias_id


def build_bot(bot_id):
    logger.info("Building Bot")
    build_response = lex.build_bot_locale(
        botId=bot_id, botVersion="DRAFT", localeId="en_US"
    )
    return build_response


def import_bot(bot_name, import_id, lex_role_arn):
    logger.info("Importing Bot")
    bot_import_result = lex.start_import(
        importId=import_id,
        resourceSpecification={
            "botImportSpecification": {
                "botName": bot_name,
                "roleArn": lex_role_arn,
                "dataPrivacy": {"childDirected": False},
                "idleSessionTTLInSeconds": 600,
            },
        },
        mergeStrategy="Overwrite",
    )
    logger.info(bot_import_result)
    return bot_import_result


def check_import_status(import_id):
    logger.info("Checking Import Status")
    timeout = 0
    while (
        timeout < 12
    ):  # Loop for a maximum of 120 seconds (12 iterations, each with a 10-second sleep)
        import_info = lex.describe_import(importId=import_id)
        logger.info(import_info)
        status = import_info.get("importStatus")

        if status == "Completed":
            logger.info("Import completed successfully")
            bot_id = import_info.get("importedResourceId")
            logger.info("Imported Bot ID: %s", bot_id)
            return bot_id

        if status == "Failed":
            error_message = import_info.get("failureReason", "Import failed")
            logger.error(error_message)
            raise RuntimeError(error_message)

        time.sleep(10)  # Wait for 10 seconds before checking again
        timeout += 1

    logger.error("Import did not complete within the specified time")
    raise RuntimeError("Import timed out")


def upload_bot(upload_info):
    logger.info("Uploading Bot")
    http = urllib3.PoolManager()
    try:
        with open("/tmp/LexBot.zip", mode="rb") as bot:
            file_data = bot.read()

    except Exception as e:
        error = {"error": f"Exception thrown: {e}"}
        print(error)
        raise Exception(error)
    try:
        upload = http.request(
            "PUT",
            upload_info["uploadUrl"],
            body=file_data,
            headers={"Content-Type": "application/zip"},
        )

    except Exception as e:
        error = {"error": f"Exception thrown: {e}"}
        print(error)
        raise Exception(error)
    logger.info(upload.data.decode("utf-8"))
    return upload


def create_bot(bot_name, lex_role_arn, zip_bucket):
    response_data = {}
    upload_info = lex.create_upload_url()
    import_id = upload_info["importId"]
    download_zip(zip_bucket)
    upload_bot(upload_info)
    import_bot(bot_name, import_id, lex_role_arn)
    bot_id = check_import_status(import_id)
    bot_alias_id = get_bot_alias_id(bot_id)
    build_bot(bot_id)
    response_data["bot_id"] = bot_id
    response_data["bot_alias_id"] = bot_alias_id
    return response_data


def delete_bot(bot_name):
    bot_id = get_bot_id(bot_name)
    print(bot_id)
    response = lex.delete_bot(botId=bot_id, skipResourceInUseCheck=True)
    return response
