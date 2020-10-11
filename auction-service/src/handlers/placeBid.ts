import createError from 'http-errors';

import commonMiddleware from '../lib/commonMiddleware';
import { DynamoDbService } from "../core/services/dynamo-db.service";

const dynamodb = new DynamoDbService();

async function placeBid(event, context) {

    const { id } = event.pathParameters;
    const { amount } = event.body;

    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set highestBid.amount = :amount',
        ExpressionAttributeValues: {
            ':amount': amount
        },
        ReturnValues: 'ALL_NEW'
    };

    let updatedAuction;

    try {
        const result = dynamodb._documentClient.update(params).promise();
        updatedAuction = (await result).Attributes;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ updatedAuction }),
    };
}

export const handler = commonMiddleware(placeBid);
