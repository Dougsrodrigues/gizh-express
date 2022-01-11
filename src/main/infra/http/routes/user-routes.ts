import { Router } from 'express';

import { CreateUserController } from '../../../../modules/accounts/controllers/create-user-controller';
import { FindUserByIdController } from '../../../../modules/accounts/controllers/find-by-id-user-controller';

const userRoutes = Router();

const createUserController = new CreateUserController();
const findUserByIdController = new FindUserByIdController();

userRoutes.post('/', createUserController.handle);
userRoutes.get('/:id', findUserByIdController.handle);

export { userRoutes };
