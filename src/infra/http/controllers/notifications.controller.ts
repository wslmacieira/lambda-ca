import { SendNotification } from '@application/use-cases/send-notification'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { chamadas } from '@application/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { inject, injectable } from 'tsyringe'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications'
import { CancelNotification } from '@application/use-cases/cancel-notification'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { formatResponse } from 'src/helpers/forma-response'

@injectable()
export class NotificationsController {
	constructor(
		@inject('SendNotification') private _sendNotifications: SendNotification,
		@inject('CancelNotification') private _cancelNotification: CancelNotification,
		@inject('ReadNotification') private _readNotification: ReadNotification,
		@inject('UnreadNotification') private _unreadNotification: UnreadNotification,
		@inject('CountRecipientNotifications') private _countRecipientNotifications: CountRecipientNotifications,
		@inject('GetRecipientNotifications') private _getRecipientNotifications: GetRecipientNotifications
	) {}

	async createNotification(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		let response: APIGatewayProxyResult
		try {
			const { recipientId, content, category } = _event.body as unknown as CreateNotificationBody

			const { notification } = await this._sendNotifications.execute({
				recipientId,
				content,
				category,
			})

			const raw = NotificationViewModel.toHTTP(notification)

			response = formatResponse(201, { notification: raw })
		} catch (err: any) {
			response = formatResponse(err.statusCode ?? 500, {
				message: err instanceof Error ? err.message : 'some error happened',
			})
		}

		chamadas.interna.push({ name: 'Create Notification', result: response })
		return response
	}

	async getFromRecipient(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		let response: APIGatewayProxyResult
		try {
			const { recipientId } = _event.pathParameters as any

			const { notifications } = await this._getRecipientNotifications.execute({
				recipientId,
			})

			response = formatResponse(200, { notifications: notifications.map(NotificationViewModel.toHTTP) })
		} catch (err: any) {
			response = formatResponse(err.statusCode ?? 500, {
				message: err instanceof Error ? err.message : 'some error happened',
			})
		}

		chamadas.interna.push({ name: 'Get Notification From Recipient', result: response })
		return response
	}

	async countFromRecipient(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		let response: APIGatewayProxyResult
		try {
			const { recipientId } = _event.pathParameters as any

			const { count } = await this._countRecipientNotifications.execute({
				recipientId,
			})

			response = formatResponse(200, { count })
		} catch (err: any) {
			response = formatResponse(err.statusCode ?? 500, {
				message: err instanceof Error ? err.message : 'some error happened',
			})
		}

		chamadas.interna.push({ name: 'Count Notification From Recipient', result: response })
		return response
	}

	async cancelNotification(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		let response: APIGatewayProxyResult
		try {
			const { notificationId } = _event.pathParameters as any

			await this._cancelNotification.execute({ notificationId })

			response = formatResponse(200)
		} catch (err: any) {
			response = formatResponse(err.statusCode ?? 500, {
				message: err instanceof Error ? err.message : 'some error happened',
			})
		}

		chamadas.interna.push({ name: 'Cancel Notification', result: response })
		return response
	}

	async readNotification(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		let response: APIGatewayProxyResult
		try {
			const { notificationId } = _event.pathParameters as any

			await this._readNotification.execute({ notificationId })

			response = formatResponse(200)
		} catch (err: any) {
			response = formatResponse(err.statusCode ?? 500, {
				message: err instanceof Error ? err.message : 'some error happened',
			})
		}

		chamadas.interna.push({ name: 'Read Notification', result: response })
		return response
	}

	async unreadNotification(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		let response: APIGatewayProxyResult
		try {
			const { notificationId } = _event.pathParameters as any

			await this._unreadNotification.execute({ notificationId })

			response = formatResponse(200)
		} catch (err: any) {
			response = formatResponse(err.statusCode ?? 500, {
				message: err instanceof Error ? err.message : 'some error happened',
			})
		}

		chamadas.interna.push({ name: 'Unread Notification', result: response })
		return response
	}
}
