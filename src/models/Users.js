const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

class Users extends Model {}

Users.init(
    {
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      timestamps: false,
    }
)

module.exports = Users;