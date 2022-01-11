import { Router } from 'express';

import { authRoutes } from './auth-routes';
import { companyRoutes } from './company-routes';
import { userRoutes } from './user-routes';

const router = Router();

router.use('/v1/user', userRoutes);
router.use('/v1/company', companyRoutes);

router.use(authRoutes);

export { router };
