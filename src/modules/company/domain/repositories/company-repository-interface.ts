import { ICreateCompanyDTO } from '../dtos/create-school-dto';
import { Company } from '../model/company';

export interface ICompanyRepository {
  create(company: ICreateCompanyDTO): Promise<void>;
  findByCnpj(cnpj: string): Promise<Company>;
}
