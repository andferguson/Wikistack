const express = require("express");
const router = express.Router();
const { userList, userPages } = require("../views");
const { User } = require("../models");
const { Page } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

// router.post("/", (req, res, next) => {
//   res.send("got to POST /user/");
// });

// router.put("/:id", (req, res, next) => {
//   res.send("got to POST /user/:id");
// });

// router.delete("/:id", (req, res, next) => {
//   res.send("got to POST /user/:id");
// });

module.exports = router;
