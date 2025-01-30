const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

class Ratings extends Model {}

Ratings.init(
    {
        rating_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Ratings',
        tableName: 'ratings',
        timestamps: false
    }
)

module.exports = Ratings;