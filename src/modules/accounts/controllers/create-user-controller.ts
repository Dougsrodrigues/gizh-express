import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '../use-cases/create-user-use-case';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const user = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(user);

    return response.status(201).send();
  }
}
