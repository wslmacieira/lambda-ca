import { handler } from './src/lambda/hello'

// TODO
import { middlewareFactory } from './src/application/middlewares'
import {
	cancelNotificationHandler,
	countFromRecipientHandler,
	createNotificationHandler,
	getFromRecipientHandler,
	readNotificationHandler,
	unreadNotificationHandler,
} from './src/lambda/notification'

export const sendHello = middlewareFactory(handler)
export const createNotification = middlewareFactory(createNotificationHandler)
export const getFromRecipient = middlewareFactory(getFromRecipientHandler)
export const countFromRecipient = middlewareFactory(countFromRecipientHandler)
export const cancelNotification = middlewareFactory(cancelNotificationHandler)
export const readNotification = middlewareFactory(readNotificationHandler)
export const unreadNotification = middlewareFactory(unreadNotificationHandler)
