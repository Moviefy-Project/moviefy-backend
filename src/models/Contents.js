const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Categories = require('./Categories');
const Ratings = require('./Ratings');

class Contents extends Model {}

Contents.init(
    {
       content_title: {
            type: DataTypes.STRING,
            allowNull: false,
       },
       content_year: {
            type: DataTypes.INTEGER,
            allowNull: false,
       },
       content_thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
       },
       category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id',
            },
            allowNull: false,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE', 
       },
       rating_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ratings',
                key: 'id',
            },
            allowNull: false,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
       },
       is_trending: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
       }
    },
    {
        sequelize,
        modelName: 'Contents',
        tableName: 'contents',
        timestamps: false,
    }
);

Contents.belongsTo(Categories, { foreignKey: 'category_id', as: 'Category' });
Categories.hasMany(Contents, { foreignKey: 'category_id' });
Contents.belongsTo(Ratings, { foreignKey: 'rating_id', as: 'Rating' });
Ratings.hasMany(Contents, { foreignKey: 'rating_id' });

module.exports = Contents;