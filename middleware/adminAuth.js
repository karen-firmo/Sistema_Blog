function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next(); //pode acessa, usuario logado
    }else{
        res.redirect("/login") //não logado, vai para page de login
    }
}

module.exports = adminAuth;