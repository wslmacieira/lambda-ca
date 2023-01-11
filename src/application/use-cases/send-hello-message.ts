import { IHelloRepository } from "../../infra/http/repositories/hello-repository";
import { inject, injectable } from "tsyringe";
import { Hello } from "../entities/hello";

@injectable()
export class SendHelloMessage {

  constructor(
    @inject("IHelloRepository") private helloRepository: IHelloRepository
  ) {}

  async sendMessage(): Promise<Hello> {
    return await this.helloRepository.sendMessage()
  }

}