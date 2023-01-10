import { Hello } from "../entities/Hello";

export interface IHelloRepository {
  sendMessage(): Promise<Hello>
}