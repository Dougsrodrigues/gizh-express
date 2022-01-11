import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../main/errors/AppError';
import { ICreateCompanyDTO } from '../domain/dtos/create-school-dto';
import { ICompanyRepository } from '../domain/repositories/company-repository-interface';

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(companyDTO: ICreateCompanyDTO) {
    const hasCompany = await this.companyRepository.findByCnpj(companyDTO.cnpj);

    if (hasCompany) throw new AppError('Esse CNPJ já está em uso.');

    await this.companyRepository.create(companyDTO);
  }
}
