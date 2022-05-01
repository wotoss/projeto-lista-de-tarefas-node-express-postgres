
//importar o express, mas não há necessidade de importar o {express} completo
//apenas importo o {Routes}
import { Router } from 'express';

import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

//agora vamos instânciar a rota em uma constante const
const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

//exportas as nosss rotas
export default routes;