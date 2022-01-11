import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../main/errors/AppError';
import { IDateProvider } from '../../../main/infra/providers/date-provider/date-provider-interface';
import { IUserTokensRepository } from '../domain/repositories/user-token-repository-interface';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(refresh_token: string) {
    const { email, sub } = verify(
      refresh_token,
      process.env.SECRET_REFRESH_TOKEN_JWT,
    ) as IPayload;

    const user_id = sub;

    const user_token =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token,
      );

    if (!user_token) {
      throw new AppError('Refresh token não encontrado!');
    }

    await this.userTokensRepository.deleteById(user_token.id);

    const new_refresh_token = sign(
      {
        email,
      },
      process.env.SECRET_REFRESH_TOKEN_JWT,
      {
        subject: user_id,
        expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
      },
    );

    const new_refresh_token_expiration = this.dateProvider.add(
      Number(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS),
      'day',
    );

    await this.userTokensRepository.create({
      user_id,
      expires_date: new_refresh_token_expiration,
      refresh_token: new_refresh_token,
    });

    return new_refresh_token;
  }
}
