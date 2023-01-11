export class NotificationNotFound extends Error {
  statusCode = 404
  constructor() {
    super('Notification not found.');
    this.statusCode
  }
}
