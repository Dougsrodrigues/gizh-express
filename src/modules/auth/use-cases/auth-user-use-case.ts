import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../main/errors/AppError';
import { IDateProvider } from '../../../main/infra/providers/date-provider/date-provider-interface';
import { IUserRepository } from '../../accounts/domain/repositories/user-repository-interface';
import { IUserTokensRepository } from '../domain/repositories/user-token-repository-interface';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha incorretos', 401);
    }

    const isPasswordEqual = await compare(password, user.password);

    if (!isPasswordEqual) {
      throw new AppError('Email ou senha incorretos', 401);
    }

    const token = sign({}, process.env.SECRET_TOKEN_JWT, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN_TOKEN_JWT,
    });

    const refresh_token = sign(
      {
        email,
      },
      process.env.SECRET_REFRESH_TOKEN_JWT,
      {
        subject: user.id,
        expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
      },
    );

    const refresh_token_expiration = this.dateProvider.add(
      Number(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS),
      'day',
    );

    await this.userTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expiration,
      refresh_token,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}
