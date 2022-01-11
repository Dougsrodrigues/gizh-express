import { Router } from 'express';

import { authRoutes } from './auth-routes';
import { userRoutes } from './user-routes';

const router = Router();

router.use('/v1/user', userRoutes);

router.use(authRoutes);

export { router };
