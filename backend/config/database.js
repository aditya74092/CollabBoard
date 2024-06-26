// In your config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('collabboard', 'myappuser', 'mypassword', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;