const sequelize = require("sequelize");
const Database = require("./../Database");

const User = Database.getConnection().define("users", 
    {
        id:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type:sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        }
    }
);

User.sync({force: false, alter: true, logging: false});

module.exports = User;