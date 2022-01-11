import { Router } from 'express';

import { AuthUserController } from '../../../../modules/auth/controllers/auth-user-controller';
import { RefreshTokenController } from '../../../../modules/auth/controllers/refresh-token-controller';

const authRoutes = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post('/sessions', authUserController.handle);
authRoutes.post('/refresh-token', refreshTokenController.handle);

export { authRoutes };
