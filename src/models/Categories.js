const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class Categories extends Model {}

Categories.init(
    {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Categories',
        tableName: 'categories',
        timestamps: false
    }
)

module.exports = Categories;