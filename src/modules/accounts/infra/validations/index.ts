import { body } from 'express-validator';

export const createUserValidation = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Campo obrigatório!')
    .isEmail()
    .withMessage('E-mail inválido!'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Campo obrigatório!')
    .isLength({ min: 6 }),
];
