"use strict";

const express = require("express");
const app = express();
const morgan = require("morgan");
const { main } = require("./views");
const { db, User, Page } = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

const init = async () => {
  // this drops all tables then recreates them based on our JS definitions
  // models.db.sync({force: true})
  await User.sync({ force: false });
  await Page.sync({ force: false });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
