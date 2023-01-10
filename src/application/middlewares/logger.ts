import { MiddlewareObj, Request } from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

import { loggerFactory } from "../services/logger.service";

export const loggerInfo = (): MiddlewareObj<APIGatewayEvent, APIGatewayProxyResult> => {
  const logger = loggerFactory()
  return {
    after: async (request: Request<APIGatewayEvent, APIGatewayProxyResult>): Promise<void> => {
      // logger.info(JSON.stringify({ chamadas, response }))
      logger(request.event.requestContext || { requestId: '' }, request)
      .info('SUCCESS')
    }
  }
}
