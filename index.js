const express = require("express");
const app = express();
const bodyParser = require("body-parser");     // bodyparser recebe dados enviados e transf. em js
const connection = require("./database/database")   // importa conexão com banco de dados
const Pergunta = require("./database/Pergunta"); //importa o model Pergunta executando no bd
const Resposta = require("./database/Resposta"); // importa o model Resposta executando np bd

//Database -- conexao teste

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })


app.set('view engine', 'ejs'); //dizendo para Express usar ejs
app.use(express.static('public')); //permite uso de imagens e css da pasta public
app.use(bodyParser.urlencoded({extended: false}))  //permite traduzir dados (decodificar)
app.use(bodyParser.json()); // premite traduzir dados json

//rotas
app.get("/",(req, res)=> {
    Pergunta.findAll({ raw: true, order:[      //findAll -- seleciona as perguntas -- raw : filtra so oq tem dados
        ['id','DESC']                          //ordena DESC - decrescente -- ASC - Crescente
    ]}).then(perguntas => {  
        console.log(perguntas);
        res.render("index",{               //envia perguntas para front end na pag principal
            perguntas: perguntas
        });  
    })
                                            
});

app.get("/perguntar",(req, res)=> {      //rota .get aparece na url
    res.render("perguntar");                                         
});

app.post("/salvarpergunta",(req, res)=> {   //rota .post nao aparece na url
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;  // variaveis que pegam o nome dos form

    Pergunta.create({           //create salva oq foi digitado no bd
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");   //redireciona a pag. / qndo salvo com sucesso
    })

});

app.get("/pergunta/:id",(req, res) => {      //rota da pesquisa
    var id = req.params.id;
    Pergunta.findOne({                // findOne busca um unico parametro
        where: {id: id}               // parametro da pesquisa
    }).then(pergunta => {
        if(pergunta != undefined){     //pergunta encontrada

            Resposta.findAll({         // findAll busca todas as respostas
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });

            });
           
        }
        else{
            res.redirect("/");         //se não achar parametro do id volta pra principal
        }
    });
    
})

app.post("/responder",(req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId);   // depois que acabar a resposta, redireciona a pag da pergunta
    });
});






app.listen(8080,()=>{
    console.log("App Rodando");
});
