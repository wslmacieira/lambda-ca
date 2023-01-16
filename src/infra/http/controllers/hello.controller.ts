import { chamadas } from '@application/middlewares'
import { IHelloRepository } from '@application/repositories/hello.repository'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { formatResponse } from 'src/helpers/forma-response'
import { inject, injectable } from 'tsyringe'

@injectable()
export class HelloController {
	constructor(@inject('IHelloRepository') private helloRepository: IHelloRepository) {}

	sendHello = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		const { message } = await this.helloRepository.sendMessage()
		let response: APIGatewayProxyResult
		try {
			// throw new Error('erro')
			response = formatResponse(200, { message })
		} catch (err: any) {
			console.error(err)
			response = formatResponse(err.statusCode ?? 500, {
				message: err instanceof Error ? err.message : 'some error happened',
			})
		}

		chamadas.interna.push({ name: 'Hello Lambda', result: response })
		return response
	}
}
