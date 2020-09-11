const Sequelize = require("sequelize");

const connection = new Sequelize('Sistema_Blog', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;
