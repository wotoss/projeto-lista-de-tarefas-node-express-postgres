//importante=> importação de modulo, vem sempre antes de importação de arquivos
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    //vamos fazer q requisição do email e senha
    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email }});
    //verificando se existe alguem cadastrado com este email
    if (!user){
      return res.status(401).json({ error: 'Usuario não existe !'});
    }
    //fazer a comparação se senha => lembrando que a senha é um hash.
    //quer ver se a senha NÂO confere = >(a senha que estou enviando não confere com a do banco)
    if (!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Senha incorreta!.'});
    }

    //vou fazer o meu retorno do servidor o que eu quero mostrar ao usuario.
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      //vamos montar a (sign ou assinatura).
      //1º parametro é o playload => vou enviar o id
      //2º parametro enviar um chave screta que criei no (md5 Has generator online)
      //3º parametro vou enviar um objeto.
      token: jwt.sign({ id }, authConfig.secret, {
      //expiresIn: apartir do momento que ele receber este token, quanto tem ele vai valer até expirar.
      expiresIn: authConfig.expiresIn, //neste caso vou deixar 7 dias.
      }),
    });
  }
}

export default new SessionController();