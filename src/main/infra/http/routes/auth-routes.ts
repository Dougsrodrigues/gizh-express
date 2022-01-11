import { Router } from 'express';

import { AuthUserController } from '../../../../modules/auth/controllers/auth-user-controller';

const authRoutes = Router();

const authUserController = new AuthUserController();

authRoutes.post('/sessions', authUserController.handle);

export { authRoutes };
