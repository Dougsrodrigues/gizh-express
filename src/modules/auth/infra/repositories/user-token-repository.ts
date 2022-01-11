import { getRepository, Repository } from 'typeorm';

import { IUserTokensRepository } from '../../domain/repositories/user-token-repository-interface';
import { ICreateUserTokenDTO } from '../../dto/create-token-user-dto';
import { UserTokensEntity } from '../entities/user-token-entity';

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokensEntity>;

  constructor() {
    this.repository = getRepository(UserTokensEntity);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokensEntity> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokensEntity> {
    const userTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
