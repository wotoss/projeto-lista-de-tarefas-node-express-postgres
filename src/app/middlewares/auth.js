import jwt from 'jsonwebtoken';
//transforma uma função de (calback em uma função async await)
//este util vem do proprio node.
import { promisify } from 'util';
import authConfig from '../../config/auth';

//sabemos que o middlewares tem acesso aos parametros req, res e dando tudo certo 
//o next para seguir o fluxo.
export default async (req, res, next) => {
const authHeader = req.headers.authorization;

//vamos verificar se o usuario esta enviando o token
//caso ele não envie o token.
if (!authHeader){
  return res.status(401).json({ error: 'Token não existe!' });
}

//quando dentro do array eu coloco [,] eu descarto automaticamente
//a primeira parte que neste caso é o bearer
//já o split eu estou tirando o espaço 
//exemplo do token => bearer 4654654hgjhghghg
//estou tirando o bearer que esta na primeira posição o espaço através do split  e ficando com o token.
const [, token] = authHeader.split(' ');

//já com o token em mãos, vamos verificar se o token é válido ou não.
 try {
   const decoded = await promisify(jwt.verify)(token, authConfig.secret);
   
   //estamos criando uma variavel user.Id que vai receber o id do usuario logado atraves do decoded.id
   req.userId = decoded.id;
   
   return next();
 } catch (err) {
   return res.status(401).json({ error: 'Token inválido!'});
 }

};