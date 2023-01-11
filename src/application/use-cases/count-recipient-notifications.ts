import { inject, injectable } from 'tsyringe';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@injectable()
export class CountRecipientNotifications {
  constructor(
    @inject("NotificationsRepository") private notificationsRepository: NotificationsRepository
    ) {}
  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
