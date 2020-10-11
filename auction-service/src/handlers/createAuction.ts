import { v4 as uuid } from 'uuid'
import createError from 'http-errors';

import commonMiddleware from '../lib/commonMiddleware';
import { DynamoDbService } from "../core/services/dynamo-db.service";

const dynamodb = new DynamoDbService();

async function createAuction(event, context) {

  const { title } = event.body;
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAd: now.toISOString()
  }

  try {
    await dynamodb._documentClient.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction
    }).promise();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }



  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
}

export const handler = commonMiddleware(createAuction);