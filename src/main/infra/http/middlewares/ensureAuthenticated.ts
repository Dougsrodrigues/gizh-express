import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserTokensRepository } from '../../../../modules/auth/infra/repositories/user-token-repository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) throw new AppError('Token obrigatório!', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      process.env.SECRET_REFRESH_TOKEN_JWT,
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!user) {
      throw new AppError('Usuário não existe!', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Token inválido!', 401);
  }
}
