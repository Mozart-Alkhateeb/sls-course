import { APIGatewayProxyEvent } from 'aws-lambda'

export class LambdaParamHelper {
    public static getPostBody (event: APIGatewayProxyEvent) {
      const body = event.body
      console.log('getPostBody', body)
      if (body) {
        return JSON.parse(body)
      }
      return {} // todo: throw invalid json
    }
}