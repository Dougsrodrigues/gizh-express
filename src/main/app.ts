import express, { NextFunction, Response, Request } from 'express';

import 'express-async-errors';
import 'reflect-metadata';
import './infra/tsyringe';

import { AppError } from './errors/AppError';
import { router } from './infra/http/routes';
import createConnection from './infra/typeorm/connection';

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal serve error - ${err.message}`,
    });
  },
);

export { app };
