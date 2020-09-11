const express = require("express");
const router = express.Router(); //usar router ao invés de app (só muda o nome mesmo)
const Category = require("./Category"); //category tabela do banco
const slugify = require("slugify");
const adminAuth = require("../middleware/adminAuth");



router.get("/admin/categories/new",adminAuth,(req,res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save",adminAuth,(req, res) => {  //method post para form
    var title = req.body.title;

    if(title != undefined && title != " "){
        Category.create({
            title: title,
            slug: slugify(title.toString()) // title= tecnologia da informacao slug= tecnologia-da-informacao
            
        }).then(()=>{
            res.redirect("/admin/categories");
        })

    }else{
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories",adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index",{categories: categories})
    })
});

router.post("/admin/categories/delete",adminAuth , (req, res) => {
    var id = req.body.id;

    //diminuir a quantidade de codigos aqui, no curso tem dois ifs
    if(id != undefined && !isNaN(id)){
        Category.destroy({
            where:{id:id}
        }).then(() => {
            res.redirect("/admin/categories");
        })
    }
})

router.get("/admin/categories/edit/:id",adminAuth, (req,res) => {
    var id = req.params.id;  //use the params here

    Category.findByPk(id).then(category => {
        if(category != undefined && !isNaN(id)){ 
            res.render("admin/categories/edit",{category: category});
        }else{
             res.redirect("/admin/categories")
        }
    }).catch(erro => {
        
        res.redirect("/admin/categories")
    })
});

router.post("/admin/categories/update",adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)},{
        where:{id:id}
    }).then(() => {
        res.redirect("/admin/categories")
    })
})


module.exports = router; //esportando o arquivo com as rotas