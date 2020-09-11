const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs")
const adminAuth = require("../middleware/adminAuth")


router.get("/admin/users",adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users})
    })
})

router.get("/admin/users/create",adminAuth, (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {  //verificar se o email já está cadastrado!
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                nome: nome,
                email:email,
                password: hash
            }).then(() => {
                res.redirect("/admin/users")
            }).catch(() => {
                res.redirect("/")
            })

        }else{
            res.redirect("/admin/users/create")
        }
    });    

    //res.json({email, password}) teste se os dados estao chegando

})


//UPDATE

router.get("/admin/users/edit/:id", adminAuth, (req,res) => {
    var id = req.params.id;

    User.findByPk(id).then(user => {
        //console.log("ENTROU AQUI E O USER É :" + user.id)

        if(user != undefined && !isNaN(id)){
            res.render("admin/users/edit", {user: user});
        }else{
            res.redirect("/admin/users")
        }
    }).catch(erro => {
        res.redirect("/admin/users")
    })
})

router.post("/admin/users/update",adminAuth ,(req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    
    User.update({nome: nome, email:email, password: hash}, {
        where:{id:id}
    }).then(()=> {
        res.redirect("/admin/users");
    });
});

//DELETE

router.post("/admin/users/delete", adminAuth ,(req,res) => {
    var id = req.body.id;

    if(id != undefined && !isNaN(id)){
        User.destroy({
            where:{id:id}
        }).then(() => {
            res.redirect("/admin/users");
        })
    }

})




router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.post("/authenticate", (req,res) => {
    var email  = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email:email}}).then(user =>{
        if(user != undefined){
            //valandando senha hash com bcrypt
            var correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/")  //REDIRECIONAR PARA ARTICLES QUANDO A PAGINA ESTIVER CONCLUIDA ****
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("/login")
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/")
})

module.exports = router;