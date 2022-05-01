//desço uma pasta para chegar no User.
import User from '../models/User';

class UserController {
  async store(req, res){
   //vamos buscar o email e verificar se ele já existe na base de dados.
   const userExists = await User.findOne({
     where: { email: req.body.email },
   });

   if (userExists){
     return res.status(400).json({ error: 'Usuario já existe!'});
   }
   

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();