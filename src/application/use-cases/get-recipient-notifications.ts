import { inject, injectable } from 'tsyringe';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@injectable()
export class GetRecipientNotifications {
  constructor(
    @inject("NotificationsRepository") private notificationsRepository: NotificationsRepository
    ) {}
  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
