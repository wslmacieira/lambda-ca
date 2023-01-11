import "reflect-metadata";
import { NotificationsController } from "@infra/http/controllers/notifications.controller";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { container } from '../shared/ContainerRegister';

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.createNotification(event)
}

export const getFromRecipientHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.getFromRecipient(event)
}
