import { getRepository, Repository } from 'typeorm';

import { ICreateCompanyDTO } from '../../domain/dtos/create-company-dto';
import { Company } from '../../domain/model/company';
import { ICompanyRepository } from '../../domain/repositories/company-repository-interface';
import { CompanyEntity } from '../entities/company-entity';

export class CompanyRepository implements ICompanyRepository {
  private repository: Repository<CompanyEntity>;

  constructor() {
    this.repository = getRepository(CompanyEntity);
  }

  async create(company: ICreateCompanyDTO): Promise<void> {
    const new_company = await this.repository.create(company);

    await this.repository.save(new_company);
  }

  async findByCnpj(cnpj: string): Promise<Company> {
    const company = await this.repository.findOne({ cnpj });

    return company;
  }

  async findByOwnerId(user_id: string): Promise<Company> {
    const company = await this.repository.findOne({ user_id });

    return company;
  }
}
