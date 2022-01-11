import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '../use-cases/create-user-use-case';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(user);

    return response.status(201).send();
  }
}
