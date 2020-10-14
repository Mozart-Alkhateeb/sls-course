import createError from 'http-errors';
import validator from '@middy/validator';

import commonMiddleware from '../lib/commonMiddleware';
import schema from '../lib/schemas/getAuctionsSchema';
import { DynamoDbService } from "../core/services/dynamo-db.service";

const dynamodb = new DynamoDbService();

async function getAuctions(event, context) {

    const { status } = event.queryStringParameters;
    let auctions;

    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status',
        ExpressionAttributeValues: {
            ':status': status
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        }
    };

    try {
        const result = await dynamodb._documentClient.query(params).promise();

        auctions = result.Items;
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ auctions }),
    };
}

export const handler = commonMiddleware(getAuctions)
    .use(validator({ inputSchema: schema }));
