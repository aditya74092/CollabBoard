const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Supplier = sequelize.define('Supplier', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    modifiedDate: {
        type:  DataTypes.STRING,
        
        allowNull: false
    }
}, {
    tableName: 'suppliers' // Ensure this is lowercase
});

module.exports = Supplier;
