const Sequelize = require("sequelize");        //importa sequelize   
const connection = require("./database");      //importa conexão com bd

const Resposta = connection.define ('respostas',{         //nome da tabela
    corpo: {
        type: Sequelize.TEXT,      //recebe a resposta em forma de texto
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,     // recebe a informação a qual pergunta a resposta respode
        allowNull: false
    }
})
 
Resposta.sync({force: false});

module.exports = Resposta;