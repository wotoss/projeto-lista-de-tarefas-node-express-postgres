
//importar o express, mas não há necessidade de importar o {express} completo
//apenas importo o {Routes}
import { Router } from 'express';

import UserController from './app/controllers/UserController';

//agora vamos instânciar a rota em uma constante const
const routes = new Router();

routes.post('/users', UserController.store);

//exportas as nosss rotas
export default routes;