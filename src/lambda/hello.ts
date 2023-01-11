import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { HelloController } from '../infra/http/controllers/hello.controller';
import { container } from '../shared/ContainerRegister';

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const helloController: HelloController = container.resolve("HelloController")
  return await helloController.sendHello(event);
}
