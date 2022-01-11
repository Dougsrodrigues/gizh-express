import { container } from 'tsyringe';

import './providers-tsyringe';

import { IUserRepository } from '../../../modules/accounts/domain/repositories/user-repository-interface';
import { UserRepository } from '../../../modules/accounts/infra/repositories/user-repository';
import { IUserTokensRepository } from '../../../modules/auth/domain/repositories/user-token-repository-interface';
import { UserTokensRepository } from '../../../modules/auth/infra/repositories/user-token-repository';
import { ICompanyRepository } from '../../../modules/company/domain/repositories/company-repository-interface';
import { CompanyRepository } from '../../../modules/company/infra/repositories/company-repository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  CompanyRepository,
);
