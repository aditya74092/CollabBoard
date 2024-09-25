const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shop = sequelize.define('Customer', {
    shop_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,  // Ensures that the number is not an empty string
            is: /^[0-9]+$/, // Ensures that the number contains only digits
            len: [10, 10]   // Ensures that the number has a length between 10 and 15 characters
        }
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
    tableName: 'shop',
    timestamps: false
});

module.exports = Shop;
