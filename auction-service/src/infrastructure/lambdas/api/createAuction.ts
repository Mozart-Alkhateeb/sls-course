import { LambdaParamHelper } from "../../lambda.helpers";
import { v4 as uuid } from 'uuid'
import { DynamoDbService } from "../../../core/services/dynamo-db.service";

const dynamodb = new DynamoDbService();

async function createAuction(event, context) {

  const { title } = LambdaParamHelper.getPostBody(event);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAd: now.toISOString()
  }

  await dynamodb._documentClient.put({
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
}

export const handler = createAuction;
