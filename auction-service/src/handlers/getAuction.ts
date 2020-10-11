import createError from 'http-errors';

import commonMiddleware from '../lib/commonMiddleware';
import { DynamoDbService } from "../core/services/dynamo-db.service";

const dynamodb = new DynamoDbService();

export async function getAuctionById(id) {
    let auction;
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

    return auction;
}

async function getAuction(event, context) {

    const { id } = event.pathParameters;

    const auction = await getAuctionById(id);

    return {
        statusCode: 200,
        body: JSON.stringify({ auction }),
    };
}

export const handler = commonMiddleware(getAuction);
