import { LambdaParamHelper } from "../../lambda.helpers";

async function createAuction(event, context) {
  const { title } = LambdaParamHelper.getPostBody(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: title, here: '6464dsdsdsdsd6' }),
  };
}

export const handler = createAuction;
