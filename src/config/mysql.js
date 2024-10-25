// src/config/mysql.js

const { Sequelize } = require('sequelize');
const { mysql } = require('./dbConfig');

const sequelize = new Sequelize(
    mysql.database,
    mysql.user,
    mysql.password,
    {
        host: mysql.host,
        dialect: 'mysql',
    }
);

module.exports = sequelize;
