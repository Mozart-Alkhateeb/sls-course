import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

import { DynamoDbService } from "../../../core/services/dynamo-db.service";

const dynamodb = new DynamoDbService();

async function getAuction(event, context) {

    let auction;
    const { id } = event.pathParameters;

    try {
        const result = await dynamodb._documentClient.get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id }
        }).promise();

        auction = result.Item;
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    if (!auction) {
        throw new createError.NotFound(`Auction with id "${id}" not found`)
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ auction }),
    };
}

export const handler = middy(getAuction)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler());
