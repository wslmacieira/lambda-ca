import { handler as teste } from './src/lambda/Hello'
import {middlewareFactory} from './src/application/middlewares'

export const sendHello = middlewareFactory(teste)