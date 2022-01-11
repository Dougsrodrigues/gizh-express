import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByIdUseCase } from '../use-cases/find-user-by-id-use-case';

export class FindUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const createUserUseCase = container.resolve(FindUserByIdUseCase);

    const user = await createUserUseCase.execute(id);

    return response.status(200).json(user);
  }
}
