import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompanyUseCase } from '../use-cases/create-company-use-case';

export class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const company = request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    await createCompanyUseCase.execute(company);

    return response
      .status(200)
      .json({ message: 'Empresa registrada com sucesso!' });
  }
}
