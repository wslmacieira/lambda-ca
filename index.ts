import { handler } from './src/lambda/hello'
import { createNotificationHandler, 
  getFromRecipientHandler, 
  countFromRecipientHandler,
  cancelNotificationHandler,
  readNotificationHandler,
  unreadNotificationHandler
 } from './src/lambda/notification'
import { middlewareFactory } from './src/application/middlewares'

export const sendHello = middlewareFactory(handler)
export const createNotification = middlewareFactory(createNotificationHandler)
export const getFromRecipient = middlewareFactory(getFromRecipientHandler)
export const countFromRecipient = middlewareFactory(countFromRecipientHandler)
export const cancelNotification = middlewareFactory(cancelNotificationHandler)
export const readNotification = middlewareFactory(readNotificationHandler)
export const unreadNotification = middlewareFactory(unreadNotificationHandler)