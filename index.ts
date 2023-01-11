import { handler as hello } from './src/lambda/hello'
import { handler as create, getFromRecipientHandler } from './src/lambda/notification'
import { middlewareFactory } from './src/application/middlewares'
export const sendHello = middlewareFactory(hello)
export const createNotification = middlewareFactory(create)
export const getFromRecipient = middlewareFactory(getFromRecipientHandler)