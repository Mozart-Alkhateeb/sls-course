import { injectable } from 'inversify'
import DynamoDB from 'aws-sdk/clients/dynamodb'
import { DataMapper } from '@aws/dynamodb-data-mapper'

// TODO add DI 
// @injectable()
export class DynamoDbService {
  readonly dataMapper: DataMapper
  readonly _client: DynamoDB
  readonly _documentClient: DynamoDB.DocumentClient


  constructor() {
    const args = {}
    if (process.env.IS_OFFLINE) {
      args['region'] = 'localhost'
      args['endpoint'] = 'http://localhost:8000'
    }

    console.log('Initializing DynamoDbService...', args)
    const client = new DynamoDB({ ...args })
    this._documentClient = new DynamoDB.DocumentClient({ ...args })
    this._client = client
    this.dataMapper = new DataMapper({ client });
  }
}
