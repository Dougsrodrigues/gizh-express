import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCompanyByOwnerUseCase } from '../use-cases/find-company-by-owner-use-case';

export class FindCompanyByOwner {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const findCompanyByOwnerUseCase = container.resolve(
      FindCompanyByOwnerUseCase,
    );

    const company = await findCompanyByOwnerUseCase.execute(user_id);

    return response.status(200).json(company);
  }
}
