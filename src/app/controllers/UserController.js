//importação de modulo, vem sempre antes de importação de arquivos.
// isto para todas as importações.
import { password } from 'pg/lib/defaults';
import * as Yup from 'yup';

//desço uma pasta para chegar no User.
import User from '../models/User';

class UserController {
  async store(req, res){

   //iremos criar o nosso schema de validação.
   const schema = Yup.object().shape({
     //name => vai aceitar string e é obrigátorio
      name: Yup.string().required(),
     //email => irá receber string será do (tipo email) e será obrigatório.
      email: Yup.string().email().required(),
     //password => terá as  validações, string, obrigátorio e terá no minimo 6 caracteres.
      password: Yup.string().required().min(6),   
   });

   //já com o objeto montado, vamos para validação do nosso schema.
   //Se ele não passar pela verificação ele cairá no if => Falha na validação.
   if (!(await schema.isValid(req.body))){
     return res.status(400).json({ error: 'Falha na validação.' });
   }

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

  //montando update atualização de usuario.
  async update(req, res){
  
  //iremos criar o nosso objeto schema de validação.  
  const schema = Yup.object().shape({
  //veja que os campos não são obrigatorios, porque como são atualização, não sabemos 
  //qual campo o usuario vai atualizar. 
  //name => vai receber string  
     name: Yup.string(),
  //email => receberá uma string e o proprio email.   
     email: Yup.string().email(),
  //senha atual que poderá ser antiga caso seja atualizada.
  //senha => receberá string e no minimo 6 caracter.
     oldPassword: Yup.string().min(6),
  //password => uma string, e no minimo 6 caracter, e tambem vou fazer um condicional.
  //se tiver (.when('oldPassword') preenchido => eu quero que o campo ou field password seja obrigatorio.
  //field significa o proprio campo (password) 
     password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
  //então vamos lá => ternario => se tiver o  oldPassword preenchido ? password que é o field será obrigatorio
  //caso não esteja preenchido :  continua o proprio campo  password ou field
     oldPassword ? field.required() : field
     ),
  //outra validação para confirmPassword. 
     confirmPassword: Yup.string().when('password', (password, field) => 
       password ? field.required().oneOf([Yup.ref('password')]) : field
       ),  
  });

  //já com o objeto montado, vamos para validação do nosso schema.
   //Se ele não passar pela verificação ele cairá no if => Falha na validação.
   if (!(await schema.isValid(req.body))){
    return res.status(400).json({ error: 'Falha na validação.' });
  }


  //vamos buscar o que precisamos atraver do req o que o usuario esta enviando.
  const { email, oldPassword } = req.body;
  //vamos procurar na base de dados um usuario o id que esta vindo para atualização.
  const user = await User.findByPk(req.userId);
  console.log(oldPassword);
  if (email !== user.email){
    //se ele encontrar o mesmo email, vai cair dentro do if que (usuario  que já existe).
    const userExists = await User.findOne({
      where: { email },
    });
  
  if (userExists){
    return res.status(400).json({ error: 'Usuario já existe.'});
     }  
  }

  //para fazer a atualização ele esta fazendo a conferencia da (senha antiga).
  //caso a senha antiga esteja errada ele não continua. Para na validação.
  //Se oldPassword que é a senha antiga venher preenchido ai sim ele faz a verificação.
  //Se o usuario não enviar pelo req requisição esta propriedade oldPassword é sinal que ele não quer 
  //alterar a senha.
  if (oldPassword && !(await user.checkPassword(oldPassword))){
    return res.status(401).json({ error: 'Senha incorreta.' });
  }

  //desconstruindo o objeto para enviar ao usuario o que esta vindo (res) do servidor ou base de dados.
  const { id, name } = await user.update(req.body);
  //construindo o que esta vindo do servidor como resposta (res)
  return res.json({
    id,
    name,
    email,
  });
  }
}

export default new UserController();