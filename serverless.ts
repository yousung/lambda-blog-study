import type { AWS } from "@serverless/typescript";
import functions from "./functions";

const PostTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        tableName: 'post',
        KeySchema: [{ AttributeName: "title", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "title", AttributeType: "S" }],
        BillingMode: "PAY_PER_REQUEST",
    },
};

function getVariableName(expression: { [key: string]: unknown }): string {
    return Object.keys(expression)[0];
}

const PostTableRoleStatement = {
    Effect: "Allow",
    Action: [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
    ],
    Resource: { "Fn::GetAtt": [getVariableName({ PostTable }), "Arn"] },
};

const dynamodbLocal = {
    stages: ["dev"],
    start: { migrate: true },
};

const config: AWS = {
    service: "lambda-blog",
    frameworkVersion: "3",
    provider: {
        name: "aws",
        runtime: "nodejs18.x",
        region: "ap-northeast-2",
        environment: {
            BUCKET_NAME: process.env.BUCKET_NAME!,
            ROOT_DOMAIN: process.env.ROOT_DOMAIN!,
            SUB_DOMAIN: process.env.SUB_DOMAIN!,
        },
        iam: {
            role: {
                statements: [
                    {
                        Action: [
                            "dynamodb:PutItem",
                            "s3:GetObject"
                        ],
                        Effect: "Allow"
                    },
                ],
            },
        },
    },
    functions,
    plugins: ["serverless-plugin-scripts", "serverless-webpack"],
    resources: {
        Resources: {
            PostTable
        }
    },
};

export = config;