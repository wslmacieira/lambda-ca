import { chamadas } from '@application/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { inject, injectable } from 'tsyringe';
import { HelloRepository } from '../repositories/hello-repository';

@injectable()
export class HelloController {
  constructor(
    @inject("IHelloRepository") private helloRepository: HelloRepository
  ) { }

  sendHello = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { message } = await this.helloRepository.sendMessage();
    let response: APIGatewayProxyResult;
    try {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message,
          // input: _event
        }),
      };
    } catch (err: unknown) {
      console.error(err);
      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: err instanceof Error ? err.message : 'some error happened',
        }),
      };
    }

    chamadas.interna.push({name: 'Hello Lambda', result: response});
    return response;
  }
}