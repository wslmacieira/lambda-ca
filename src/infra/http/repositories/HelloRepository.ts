import { Hello } from "../../../application/entities/Hello";
import { IHelloRepository } from "../../../application/repositories/IHelloRepository";

export class HelloRepository implements IHelloRepository {
  async sendMessage(): Promise<Hello> {
    return new Hello({ message: 'Hello world!!!, lambda with Typescript' })
  }
}