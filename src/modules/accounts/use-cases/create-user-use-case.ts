import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../main/errors/AppError';
import { CreateUserDTO } from '../domain/dtos/create-user-dto';
import { IUserRepository } from '../domain/repositories/user-repository-interface';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user: CreateUserDTO): Promise<void> {
    const hasUser = await this.userRepository.findByEmail(user.email);
    if (hasUser) {
      throw new AppError('Esse email já está em uso.');
    }

    const passwordHash = await hash(user.password, 8);

    const newUser = { ...user, password: passwordHash };

    await this.userRepository.create(newUser);
  }
}
