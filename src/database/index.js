import Sequelize  from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

//veja que eu coloco os models em um array [] por ser varios.
const models = [User];

class Database {
  constructor() {
    this.init();
  }
//o método init vai fazer a conexão da base de dados com os models de nossa aplicação.
  init(){
//veja que através do import databaseConfig => ele vai lá no arquivo database.js 
//buscar as configurações de acesso a base de dados.   
    this.connection = new Sequelize(databaseConfig);
//através do map eu vou percorrer todo o array os models. 
//então eu vou até o array de models percorro, pego o atual e carrego com o banco de dados (this.connection) 
    models.map(model => model.init(this.connection));   
  }
}
export default new Database();