import { ICreateCompanyDTO } from '../dtos/create-company-dto';
import { Company } from '../model/company';

export interface ICompanyRepository {
  create(company: ICreateCompanyDTO): Promise<void>;
  findByCnpj(cnpj: string): Promise<Company>;
  findByOwnerId(user_id: string): Promise<Company>;
}
