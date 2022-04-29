
//importar o express, mas não há necessidade de importar o {express} completo
//apenas importo o {Routes}
import { Router } from 'express';


//agora vamos instânciar a rota em uma constante const
const routes = new Router();

//montando as rotas.
routes.get('/teste', (req, res) => {
  return res.json({ ok:true });
})


//exportas as nosss rotas
export default routes;