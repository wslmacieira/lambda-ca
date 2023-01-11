import { Hello } from "../entities/hello";

export interface IHelloRepository {
  sendMessage(): Promise<Hello>
}