const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userid: {  // Use lowercase to match the database column name
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {  // Use lowercase to match the database column name
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'customers',
    timestamps: false
});

module.exports = Customer;
