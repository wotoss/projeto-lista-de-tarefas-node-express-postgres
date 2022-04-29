//fazedno os imports do que sera usado.
import express from "express";
import routes from './routes';

//fazendo a construção da classe App e do construtor.
//construtor o que será inicializado.
class App{
  constructor(){
  //dentro do construtor iniciaremos o framework express, middlewares e routes
  this.server = express();
  
  this.middlewares();
  this.routes();
  
  }
  //já os middlewares eu vou fazer fora do construtor.
  middlewares(){
    this.server.use(express.json());
  }
  //vamos importar todas as rotas
  routes(){
    this.server.use(routes);
  }
}


//fazendo a exportação padrão
export default new App().server;