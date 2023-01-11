export class RecipientNotFound extends Error {
  statusCode = 404
  constructor() {
    super('Recipient not found.');
    this.statusCode
  }
}
