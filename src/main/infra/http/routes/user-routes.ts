import { Router } from 'express';

import { CreateUserController } from '../../../../modules/accounts/controllers/create-user-controller';

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post('/', createUserController.handle);

export { userRoutes };
