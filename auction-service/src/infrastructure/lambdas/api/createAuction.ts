import { LambdaParamHelper } from "../../lambda.helpers";

async function createAuction(event, context) {

  const { title } = LambdaParamHelper.getPostBody(event);
  const now = new Date();

  const auction = {
    title,
    status: 'OPEN',
    createdAd: now.toISOString()
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
}

export const handler = createAuction;
