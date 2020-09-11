const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session")
const connection = require("./database/database");

const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");
const UsersController = require("./user/UsersController");

const Article = require("./articles/Articles")
const Categories = require("./categories/Category")
const User = require("./user/User")

connection.authenticate()
        .then(()=> {
            console.log("conexão com mysql realizada com sucesso")
        }).catch((error) => {
            console.log(error);
        });





//view enginer
app.set('view engine', 'ejs');

//Static
app.use(express.static('public')); 

//Sessions  (aula 121)
//usar redis para session em aplicaçoes de grande porte, não é o caso neste exemplo(aula 122)

app.use(session({
    secret: "pode-inserir-qualquer-coisa-aleatoria-aqui-é-para-segurança-da-session",
    cookie: {maxAge: 900000 }, //tempo para expirar, é usado milisegundos, 30000 = 3s

}))

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use("/", CategoriesController);  //rodando as rotas importadas do arquivo categoriescontroller
app.use("/", ArticlesController)
app.use("/", UsersController);


app.get("/session" , (res, req) => {  //as informações de session pode ser acessada de qualquer rota da aplicaçao

});

app.get("/leitura", (res, req) => {

});


app.get("/", (req, resp) => {
    resp.render("index")
})

app.listen(3000,()=>{
    console.log("o servidor está rodando")
})