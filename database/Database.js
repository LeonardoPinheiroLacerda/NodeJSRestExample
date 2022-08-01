const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

class Database {

    static getConnection() {
        return new Sequelize(
            "games", //database
            "games", //user
            "01234", //password
        {
            host: "localhost",
            dialect: "postgres",
            timezone: "-03:00"
        });
    }

}

module.exports = Database;