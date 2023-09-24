const Sequelize = require("sequelize");        //importa sequelize   
const connection = require("./database");      //importa conexão com bd

const Pergunta = connection.define('perguntas',{         //gera tabela com model
    titulo:{
        type: Sequelize.STRING,
        allowNull: false           //impede que o campo nao receba valores nulos
    },
    descricao:{
        type: Sequelize.TEXT,
       allowNull: false 
    }
});

Pergunta.sync({force: false}).then(() => {    //cria a tabela e sincroniza no bd
});                                           //force: false -- impede que se crie a tabela com mesmo nome
                                              //then -- mensagem para qndo a tabela for exibida
module.exports = Pergunta;                    // exporta o modulo pergunta                                            