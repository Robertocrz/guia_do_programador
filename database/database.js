const Sequelize = require('sequelize');    //modulo de conexão banco de dados

const connection = new Sequelize('guiaperguntas','root','robertormf', { //informacao bd/usuario/senha
    host : 'localhost',         //local banco de dados
    dialect : 'mysql'           //linguagem do  bd
});

module.exports = connection;  // exportação da conexão