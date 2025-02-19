const express = require("express");
const cors = require("cors");

const sequelizeClient = require("./app/database/connect");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.set("port", process.env.PORT);

app.set("host", process.env.HOST);

async function dbConnect() {
  try {
    await sequelizeClient.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

dbConnect();

module.exports = app;
