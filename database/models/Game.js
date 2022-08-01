const sequelize = require("sequelize");
const database = require("../Database");

const Game = database.getConnection().define("games",
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

Game.sync({force: true});

module.exports = Game;