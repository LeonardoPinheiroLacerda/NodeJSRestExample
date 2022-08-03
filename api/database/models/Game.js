const sequelize = require("sequelize");
const Database = require("../Database");

const Game = Database.getConnection().define("games",
    {
        title: {
            type: sequelize.STRING,
            allowNull: false
        },
        year: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: sequelize.FLOAT,
            allowNull: false
        }
    }
);

Game.sync({force: false, alter: true, logging: false});

module.exports = Game;