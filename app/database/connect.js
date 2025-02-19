const { Sequelize } = require("sequelize");

const sequelizeClient = new Sequelize("HellsKitchen", "HellsKitchen", "LucaMa", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelizeClient;
