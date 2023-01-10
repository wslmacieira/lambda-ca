import { Request } from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger, format, transports } from "winston";

type Chamadas = {
  externa: any[]
  interna: any[]
}

export let chamadas: Chamadas = {
  externa: [],
  interna: []
};

const formattedTime = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  year: 'numeric',
  month: 'numeric',
  timeZone: 'America/Sao_Paulo'
}).format(new Date());

const customFormat = format((info) => {
  const { level, ...rest} = info
  delete rest.message;
  // rest.message.statusCode = status || 500
  return { level: level.toUpperCase(), _time: formattedTime, ...rest }
});

export const loggerFactory = (application: string = 'lambda-teste-ts') =>
  ({ requestId }: any, { event, response }: Request<APIGatewayEvent, APIGatewayProxyResult>) => {
    const requestDate = event.requestContext
      ? new Date(event.requestContext.requestTimeEpoch)
      : new Date(Date.now())

    const Logger = createLogger({
      // level: 'info',
      defaultMeta: {
        requestId,
        application,
        ...(event && event.httpMethod ? { httpMethod: event.httpMethod } : {}),
        // ...(event && event.headers ? event.headers : {}),
        chamadasExterna: chamadas.externa,
        chamadasInterna: chamadas.interna,
        // data: response,
        requestDate,
        responseDate: new Date(),
        timeInMilliseconds: new Date().getMilliseconds() - requestDate.getMilliseconds()
      },
      exitOnError: false,
      transports: [
        new transports.Console({
          format: format.combine(
            customFormat(),
            format.json()
          )
        })
      ]
    })

    return Logger
  }