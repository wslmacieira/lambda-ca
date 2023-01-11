import { injectable } from "tsyringe";
import { PrismaClient } from "../generated/client";

@injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super()
    this.connect()
  }

  async connect() {
    return this.$connect()
  }

}