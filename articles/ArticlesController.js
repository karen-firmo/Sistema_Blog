const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("slugify");
const adminAuth = require("../middlewares/adminAuth");


router.get("admin/articles", adminAuth, (req,res) =>{
    Article.findAll ({
        include: [{model: Category}]
 }).then(articles =>{
     res.render("admin/articles/index", {articles: articles});

 })
    
 
});    


router.get("/admin/articles/new", adminAuth, (req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    });  
});



