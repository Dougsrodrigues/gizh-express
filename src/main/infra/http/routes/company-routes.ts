import { Router } from 'express';

import { CreateCompanyController } from '../../../../modules/company/controllers/create-company-controller';
import { FindCompanyByOwner } from '../../../../modules/company/controllers/find-company-by-owner-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const companyRoutes = Router();

const createCompanyController = new CreateCompanyController();
const findCompanyByOwner = new FindCompanyByOwner();

companyRoutes.post('/', ensureAuthenticated, createCompanyController.handle);
companyRoutes.get(
  '/user/:user_id',
  ensureAuthenticated,
  findCompanyByOwner.handle,
);

export { companyRoutes };
