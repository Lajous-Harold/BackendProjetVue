const express = require("express");
const cors = require("cors");

const sequelizeClient = require("./app/database/connect");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./app/routes/user");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

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
app.use("/api/v1/user", userRoutes);
module.exports = app;
