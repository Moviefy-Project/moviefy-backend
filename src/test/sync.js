const sequelize = require("../config/database.js");
const Users = require("../models/Users.js");
const Ratings = require("../models/Ratings.js");
const Categories = require("../models/Categories.js");
const Contents = require("../models/Contents.js");
const Bookmarks = require("../models/Bookmarks.js");

async function CreateTable(){
    try {
        await sequelize.sync();
        console.log("Created table successfully.");
    } catch (error) {
        console.error("An error occurred while creating tables: ", error);
    } finally {
        await sequelize.close();
    }
}

CreateTable();