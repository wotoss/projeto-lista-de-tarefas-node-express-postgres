
//importar o express, mas não há necessidade de importar o {express} completo
//apenas importo o {Routes}
import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

//agora vamos instânciar a rota em uma constante const
const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

//lembrando nesta rota put teremos o middleware.
//que vem como parametro o res, req e dando tudo certo o next e seguindo o fluxo.
//todas as rotas que estiverem abaixo deste middleware precisará do token para se autenticar.
//ou para entrar no sistema.
routes.use(authMiddleware);
routes.put('/users', UserController.update);

//exportas as nosss rotas
export default routes;