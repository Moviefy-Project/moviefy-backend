const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Users = require("./Users.js");
const Contents = require("./Contents.js");

class Bookmarks extends Model {}

Bookmarks.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    content_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Contents,
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Bookmarks",
    tableName: "bookmarks",
    timestamps: false,
  }
);

Users.belongsToMany(Contents, {through: Bookmarks, foreignKey: "user_id", as: "BookmarkedContents"});
Contents.belongsToMany(Users, {through: Bookmarks, foreignKey: "content_id", as: "BookmarkedBy"});

module.exports = Bookmarks;