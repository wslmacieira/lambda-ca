import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { chamadas } from '@application/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { inject, injectable } from 'tsyringe';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@injectable()
export class NotificationsController {
  constructor(
    @inject("SendNotification") private sendNotifications: SendNotification,
    // @inject("CancelNotification") private cancelNotification: CancelNotification,
    // @inject("ReadNotification") private readNotification: ReadNotification,
    // @inject("UnreadNotification") private unreadNotification: UnreadNotification,
    // @inject("CountRecipientNotifications") private countRecipientNotifications: CountRecipientNotifications,
    @inject("GetRecipientNotifications") private getRecipientNotifications: GetRecipientNotifications,
  ) { }

  createNotification = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
      const { recipientId, content, category } = _event.body as unknown as CreateNotificationBody;

      const { notification } = await this.sendNotifications.execute({
        recipientId,
        content,
        category,
      });

      const raw = NotificationViewModel.toHTTP(notification);

      response = {
        statusCode: 200,
        body: JSON.stringify({ notification: raw }),
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

    chamadas.interna.push({ name: 'Create Notification', result: response });
    return response;
  }

  async getFromRecipient (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult;
    try {
      const { recipientId } = _event.pathParameters as any
  
      const { notifications } = await this.getRecipientNotifications.execute({
        recipientId,
      });
      response = {
        statusCode: 200,
        body: JSON.stringify({ notification: notifications.map(NotificationViewModel.toHTTP) }),
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

    chamadas.interna.push({ name: 'Create Notification', result: response });
    return response;
  }
}
