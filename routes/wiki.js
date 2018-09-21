const express = require("express");
const router = express.Router();
const { addPage } = require("../views/");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  //res.send("got to GET /wiki/");
  res.redirect("/");
});

router.post('/', async (req, res, next) => {
  debugger;
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  console.log(res.json(req.body));
  // console.log(res.json(req.body.content));
  
  const page = new Page({
    title: res.json(req.body.title),
    content: res.json(req.body.content)
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});



module.exports = router;
