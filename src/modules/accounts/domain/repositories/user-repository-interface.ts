import { CreateUserDTO } from '../dtos/create-user-dto';
import { User } from '../model/user';

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
