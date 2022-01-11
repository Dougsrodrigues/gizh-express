import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../main/errors/AppError';
import { IUserRepository } from '../../accounts/domain/repositories/user-repository-interface';
import { ICreateCompanyDTO } from '../domain/dtos/create-company-dto';
import { ICompanyRepository } from '../domain/repositories/company-repository-interface';

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(companyDTO: ICreateCompanyDTO) {
    const hasCompany = await this.companyRepository.findByCnpj(companyDTO.cnpj);

    if (hasCompany) throw new AppError('Esse CNPJ já está cadastrado.');

    const user = await this.userRepository.findById(companyDTO.user_id);

    if (!user) throw new AppError('Usuário não existe.');

    const isUserAlreadyRegisterCompany =
      await this.companyRepository.findByOwnerId(companyDTO.user_id);

    if (isUserAlreadyRegisterCompany)
      throw new AppError('Usuário já possui uma empresa.');

    await this.companyRepository.create(companyDTO);
  }
}
