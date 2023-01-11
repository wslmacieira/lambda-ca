import "reflect-metadata";
import { NotificationsController } from "@infra/http/controllers/notifications.controller";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { container } from '../shared/container-register';

export const createNotificationHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.createNotification(event)
}

export const getFromRecipientHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.getFromRecipient(event)
}

export const countFromRecipientHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.countFromRecipient(event)
}

export const cancelNotificationHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.cancelNotification(event)
}

export const readNotificationHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.readNotification(event)
}

export const unreadNotificationHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notificationController: NotificationsController = container.resolve("NotificationsController")
  return await notificationController.unreadNotification(event)
}
