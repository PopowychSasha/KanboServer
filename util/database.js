const Sequelize = require("sequelize");

const sequelize = new Sequelize("kanbo", "root", "mainAdmin1", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
