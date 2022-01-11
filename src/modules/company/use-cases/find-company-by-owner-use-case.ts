import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../main/errors/AppError';
import { ICompanyRepository } from '../domain/repositories/company-repository-interface';

@injectable()
export class FindCompanyByOwnerUseCase {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(user_id: string) {
    const company = await this.companyRepository.findByOwnerId(user_id);

    if (!company) throw new AppError('Empresa não encontrada.');

    return company;
  }
}
