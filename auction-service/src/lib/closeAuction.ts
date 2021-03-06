import { DynamoDbService } from '../core/services/dynamo-db.service';

const dynamodb = new DynamoDbService();


export async function closeAuction(auction) {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const result = await dynamodb._documentClient.update(params).promise();
  return result;
}