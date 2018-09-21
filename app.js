"use strict";
const express = require("express");
const app = express();
const morgan = require("morgan");
const main = require("./views/main");
const { db, User, Page} = require("./models");

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send(main(""));
});

const init = async () => {
// this drops all tables then recreates them based on our JS definitions
// models.db.sync({force: true})
  await User.sync();
  await Page.sync();

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
