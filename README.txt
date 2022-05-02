Passo no cmd =  [1, 2 ]
1º => yarn init -y
  a => package.json

2º => yarn add express
  a=> node_modules
  b=> yarn.lock

3º => instalando dois framework =>  yarn add nodemon sucrase -D
   a=> nodemon  =>para fazer lazy load => atualizar sempre o arquivo
   b=> sucrase -D => "porcurar saber sobre o sucrase " -D para dependencia de desenvolvimento.

4º => Pastas e Arquivos
   a=> pasta src "source"
   b=> arquivo app.js
   c=> arquivo server.js
   d=> arquivo routes.js

5º => registrar o nodemon => no arquivo => nodemon.json
{
  "execMap":{
    "js": "node -r sucrase/register"
  }
}

6º => já no arquivo =>  package.json
 "scripts": {
    "dev": "nodemon src/server.js"
  },

"atraves desta configuração eu posso chamar o servidor => como yarn dev"

7º =>
  a =  yarn add eslint -D
  b =  yarn eslint --init

8º =>Instalação 
 yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
depois rodo este codigo para fixar 
yarn eslint --fix --ext .js

Neste arquivo .prettierrc
{
  "singleQuote"; true,
  "trailingComma"; "es5"
}

9º => Postgres  => Utilizamos nesta aplicação a base de dados (postgres). 
    a => vamos em => pgAdmin => para startar o nosso servidor e abrir a interface do banco de dados.
    b =>  diretorio onde foi instalado => C:\Program Files\PostgreSQL\13
    c=>  C:\Program Files\PostgreSQL\13\data
    d => Porta padrão => 5432
    e=> senha => woto
    f => ORM Sequelize => para uso de banco de dados relacional MySql, PostgreSql, MariaDb, SQLite => Olhe a documentação.
    h=> yarn add sequelize-cli -D => instalando o sequelize em -D desenvolvimento.

10º => Construindo migrations
    a=> yarn sequelize migration:create --name=create-users

11º => Rodando a ultima migrations que foi feita (Para construção da tabela na base de dados).
    a=> yarn sequelize db:migrate

12º => Apagando deletando a ultima migrations, caso erre. (inclusive quando desfazer automaticamente some a tabela)
    a=> yarn sequelize db:migrate:undo

13º => Para desfazer todas as migrations existente e consequentemente as tabelas da base de dados.
    a=> yarn sequelize db:migrate:undo:all

14º => Instalar o bcrypt js para criptografar a senha
    a=> yarn add bcrypt js

15º => Instalamos Json Web Token 
    a => yarn add jsonwebtoken    

 Padrões 
 # importação de modulo, vem sempre antes de importação de arquivos.
 # isto para todas as importações.
> import jwt from 'jsonwebtoken';
> import User from '../models/User';

16º => Instalamos a biblioteca yup para trabalhar com validações de campos.
    a => yarn add yup



