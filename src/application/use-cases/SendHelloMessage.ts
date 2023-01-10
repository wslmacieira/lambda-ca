import { HelloRepository } from "../../infra/http/repositories/HelloRepository";
import { inject, injectable } from "tsyringe";
import { Hello } from "../entities/Hello";

@injectable()
export class SendHelloMessage {

  constructor(
    @inject("IHelloRepository") private helloRepository: HelloRepository
  ) {}

  async sendMessage(): Promise<Hello> {
    return await this.helloRepository.sendMessage()
  }

}