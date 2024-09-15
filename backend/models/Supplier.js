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
    tableName: 'suppliers',
    timestamps: false
});

module.exports = Supplier;
