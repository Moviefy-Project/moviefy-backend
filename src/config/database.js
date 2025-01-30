const { Sequelize } = require("sequelize");
const config = require("./config.js");

const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
    sequelizeConfig.database,
    sequelizeConfig.username,
    sequelizeConfig.password,
    {
        host: sequelizeConfig.host,
        dialect: sequelizeConfig.dialect,
        logging: false
    }
);

module.exports = sequelize;