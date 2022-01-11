import { IUserTokensRepository } from '../../domain/repositories/user-token-repository-interface';
import { ICreateUserTokenDTO } from '../../dto/create-token-user-dto';
import { UserTokensEntity } from '../entities/user-token-entity';

export class UserTokensRepository implements IUserTokensRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokensEntity> {
    throw new Error('Method not implemented.');
  }
}
