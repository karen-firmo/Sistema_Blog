const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING, allowNull: false
    },
    slug:{
        type: Sequelize.STRING, allowNull: false
    }
})

// Category.sync({force: true});   //ESSA LINHA É NECESSARIA SOMENTE NA PRIMEIRA VEZ QUE EXECUTAR A CRIAÇÃO

module.exports = Category;