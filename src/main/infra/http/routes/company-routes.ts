import { Router } from 'express';

import { CreateCompanyController } from '../../../../modules/company/controllers/create-company-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const companyRoutes = Router();

const createCompanyController = new CreateCompanyController();

companyRoutes.post('/', ensureAuthenticated, createCompanyController.handle);

export { companyRoutes };
