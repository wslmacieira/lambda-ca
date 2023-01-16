import middy from '@middy/core'
import { APIGatewayProxyHandler, Handler } from 'aws-lambda'
import { jsonBodyParser } from './body-parser'
import { loggerInfo } from './logger'

export function middlewareFactory(handler: Handler): APIGatewayProxyHandler {
	return middy(handler).use(jsonBodyParser()).use(loggerInfo())
}
