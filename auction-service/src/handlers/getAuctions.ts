import createError from 'http-errors';

import commonMiddleware from '../lib/commonMiddleware';
import { DynamoDbService } from "../core/services/dynamo-db.service";

const dynamodb = new DynamoDbService();

async function getAuctions(event, context) {

    let auctions;

    try {
        const result = await dynamodb._documentClient.scan({
            TableName: process.env.AUCTIONS_TABLE_NAME
        }).promise();

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

export const handler = commonMiddleware(getAuctions);
