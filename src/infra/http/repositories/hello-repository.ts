import { Hello } from "../../../application/entities/hello";
import { IHelloRepository } from "../../../application/repositories/hello.repository";

export class HelloRepository implements IHelloRepository {
  async sendMessage(): Promise<Hello> {
    return new Hello({ message: 'Hello world!!!, lambda with Typescript' })
  }
}