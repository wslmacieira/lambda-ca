import { HelloRepository } from '../infra/http/repositories/hello-repository';
import { container } from 'tsyringe';
import { HelloController } from '../infra/http/controllers/hello.controller';
import { NotificationsController } from '../infra/http/controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { PrismaNotificationsRepository } from '@infra/database/prisma/repositories/prisma-notifications-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';

container.register("IHelloRepository", HelloRepository)
container.register("HelloController", HelloController)
container.register("NotificationsController", NotificationsController)
container.register("SendNotification", SendNotification)
container.register("GetRecipientNotifications", GetRecipientNotifications)
container.register("NotificationsRepository", PrismaNotificationsRepository)
container.register("PrismaNotificationsRepository", PrismaNotificationsRepository)
container.register("PrismaService", PrismaService)

export { container };
