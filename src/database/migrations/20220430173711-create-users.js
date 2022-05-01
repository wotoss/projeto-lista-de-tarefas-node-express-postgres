'use strict';

module.exports = {
  //este método up vai criar a nossa tabela na base de dados
   up (queryInterface, Sequelize) {
     return  queryInterface.createTable('users', { 
       id: {
         //estamos dizendo que o id será de um tipo inteiro.
        type: Sequelize.INTEGER, 
        //este id não pode ser nullo
        allowNull: false,
        //ele vai auto incrementar toda vez que criarmos um usuario ele aumenta 1 numero.
        autoIncrement: true,
        //e tambem será a chave primaria da tabela users ou usuarios.
        primarykey: true,
        },
        name: {
          //este name receberá o tipo String
          type: Sequelize.STRING,
          //este nome não poderá ser nulo
          allowNull: false,
        },
        email: {
          //este email receberá o tipo String 
          type: Sequelize.STRING,
          //este email não poderá ser nulo.
          allowNull: false,
          //só poderá te um unico email no banco de dados.
          //não poderá ter dois iguais apena um unico.
          unique: true,
        },
        //coloquei password_hash porque não vamos gravar a senha e sim o hash criptografado
        //e ná hora que for logar será descriptogrado e fazemos a comparação.
        password_hash: {
          //esta senha ou  passaword_hash receberá um valor em string 
          type: Sequelize.STRING,
          //esta senha não poderá ser nulo.
          allowNull: false,
        },
        //este dois campos [created_at, update_at] o sequelize preenche automaticamente.
        //através da configuração do (timestamps: true), que esta no arquivo database.js
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
     });
  },
  //o método down vai excluir caso seja necessário
   down (queryInterface) {
    return  queryInterface.dropTable('users');
  }
};
