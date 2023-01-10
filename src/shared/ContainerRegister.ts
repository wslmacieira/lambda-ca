import { HelloRepository } from '../infra/http/repositories/HelloRepository';
import { container } from 'tsyringe';
import { HelloController } from '../infra/http/controllers/HelloController';

container.register("IHelloRepository", HelloRepository)
container.register("HelloController", HelloController)

export { container };