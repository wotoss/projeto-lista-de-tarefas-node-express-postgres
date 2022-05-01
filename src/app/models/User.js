import Sequelize, { Model } from 'sequelize';
//após instalarmos, vamos importar o bcrypt para podermos criptografar o password 
import bcrypt from 'bcrypt';

class User extends Model{
  static init(sequelize){
   //este super esta chamando o método init do extends classe Model 
    super.init(
    {
   //aqui entrará especificamente os campos que o usuario vai enviar.
      name: Sequelize.STRING,
      email: Sequelize.STRING,
   //vamos criar um campo virtual, onde este campo não vai para a base de dados.
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,     
    },
    {
      //sequelize que esta no parametro linha 4
      sequelize,
    }
    );
    //antes dele salvar ele vai chamar esta função => anônima na frente 
    this.addHook('beforeSave', async user => {
    //então se a senha tiver vindo (user.password) ele criptografar e colocar dentro do meu 
    //user.password_hash
    if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
    }
    });
    return this; //para ele chamar o método init da classe
  }
}
export default User;