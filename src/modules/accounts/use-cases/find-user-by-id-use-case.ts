import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../main/errors/AppError';
import { User } from '../domain/model/user';
import { IUserRepository } from '../domain/repositories/user-repository-interface';

@injectable()
export class FindUserByIdUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado!');
    }

    delete user.password;

    return user;
  }
}
