import { getRepository, Repository } from 'typeorm';

import { CreateUserDTO } from '../../domain/dtos/create-user-dto';
import { User } from '../../domain/model/user';
import { IUserRepository } from '../../domain/repositories/user-repository-interface';
import { UserEntity } from '../../infra/entities/user.entity';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async create(user: CreateUserDTO): Promise<void> {
    const newUser = this.repository.create(user);

    await this.repository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}
