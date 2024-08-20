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
        type: DataTypes.STRING,  // Assuming number is a string to store phone numbers
        allowNull: false
    }
}, {
    tableName: 'customers', // Ensure this is lowercase
    timestamps: false // Disable automatic createdAt and updatedAt fields
});

module.exports = Customer;
