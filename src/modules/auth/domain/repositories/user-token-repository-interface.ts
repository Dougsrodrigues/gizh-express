import { ICreateUserTokenDTO } from '../../dto/create-token-user-dto';
import { UserTokensEntity } from '../../infra/entities/user-token-entity';

interface IUserTokensRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokensEntity>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokensEntity>;
  deleteById(id: string): Promise<void>;
}

export { IUserTokensRepository };
