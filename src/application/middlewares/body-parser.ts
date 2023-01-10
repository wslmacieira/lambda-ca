import { MiddlewareObj , Request} from "@middy/core"
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda"

export function jsonBodyParser(): MiddlewareObj<APIGatewayEvent,APIGatewayProxyResult> {
  return {
    before: async ({ event }: Request<APIGatewayEvent, APIGatewayProxyResult>): Promise<void> => {
      event.body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    }
  }
}
