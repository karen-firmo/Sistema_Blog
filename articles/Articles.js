const Sequelize = require("sequelize");
const connection = require("../database/database")
const Category = require("../categories/Category")

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING, allowNull: false
    },
    slug:{
        type:Sequelize.STRING, allowNull:false
    },
    body:{
        type: Sequelize.TEXT, allowNull: false
    }
});

//criando relacionamento 1 -para- N
Category.hasMany(Article); //hasMany(tem muitos), uma categoria tem muitos artigos
Article.belongsTo(Category); //belongsTo(pertence a), 1articles pertence a 1categoria

// Article.sync({force: true});   //ESSA LINHA É NECESSARIA SOMENTE NA PRIMEIRA VEZ QUE EXECUTAR ESTE ARQUIVO

module.exports = Article;























/*MODELOS SQL DAS TABELAS GERADAS PELO SEQUELIZE

CREATE TABLE IF NOT EXISTS `articles` 
(`id` INTEGER NOT NULL auto_increment ,
 `title` VARCHAR(255) NOT NULL,
 `slug` VARCHAR(255) NOT NULL,
 `body` TEXT NOT NULL, 
 `createdAt` DATETIME NOT NULL, 
 `updatedAt` DATETIME NOT NULL, 
 `categoryId` INTEGER, 
 PRIMARY KEY (`id`), 
 FOREIGN KEY (`categoryId`) 
 REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) 

CREATE TABLE IF NOT EXISTS `categories` 
(`id` INTEGER NOT NULL auto_increment , 
`title` VARCHAR(255) NOT NULL, 
`slug` VARCHAR(255) NOT NULL, 
`createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL, 
PRIMARY KEY (`id`)) 

*/