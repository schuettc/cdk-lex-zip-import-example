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


def put_resource_policy(bot_arn, bot_policy):
    # bot_arn = "".join(["arn:aws:lex:", region, ":", account_id, ":bot-alias/", bot_id, "/", bot_alias_id])
    # resource_response = lex.create_resource_policy_statement(
    #     resourceArn=bot_arn,
    #     statementId="PSTNAudioLex",
    #     effect="Allow",
    #     principal=[
    #         {
    #             "service": "voiceconnector.chime.amazonaws.com",
    #         },
    #     ],
    #     action=[
    #         "lex:StartConversation",
    #     ],
    #     condition={
    #         "StringEquals": {"AWS:SourceAccount": account_id},
    #         "ArnEquals": {"AWS:SourceArn": "arn:aws:voiceconnector:" + region + ":" + account_id + ":*"},
    #     },
    # )
    # bot_policy = {
    #     "Version": "2012-10-17",
    #     "Statement": [
    #         {
    #             "Sid": "AllowChimePstnAudioUseBot",
    #             "Effect": "Allow",
    #             "Principal": {"Service": "voiceconnector.chime.amazonaws.com"},
    #             "Action": "lex:StartConversation",
    #             "Resource": "arn:aws:lex:us-east-1:104621577074:bot-alias/9UZAR8J2XF/T2JZBPSDW0",
    #             "Condition": {
    #                 "StringEquals": {"AWS:SourceAccount": "104621577074"},
    #                 "ArnEquals": {"AWS:SourceArn": "arn:aws:voiceconnector:us-east-1:104621577074:*"},
    #             },
    #         }
    #     ],
    # }
    resource_response = lex.create_resource_policy(resourceArn=bot_arn, policy=bot_policy)

    logger.info(resource_response)
    return resource_response
