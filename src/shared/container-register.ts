import { HelloRepository } from '../infra/http/repositories/hello-repository';
import { container } from 'tsyringe';
import { HelloController } from '../infra/http/controllers/hello.controller';
import { NotificationsController } from '../infra/http/controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { PrismaNotificationsRepository } from '@infra/database/prisma/repositories/prisma-notifications-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UnreadNotification } from '@application/use-cases/unread-notification';

container.register("HelloController", HelloController)
container.register("NotificationsController", NotificationsController)
container.register("SendNotification", SendNotification)
container.register("GetRecipientNotifications", GetRecipientNotifications)
container.register("CountRecipientNotifications", CountRecipientNotifications)
container.register("CancelNotification", CancelNotification)
container.register("ReadNotification", ReadNotification)
container.register("UnreadNotification", UnreadNotification)
container.register("IHelloRepository", HelloRepository)
container.register("NotificationsRepository", PrismaNotificationsRepository)
container.register("PrismaNotificationsRepository", PrismaNotificationsRepository)
container.register("PrismaService", PrismaService)

export { container };
