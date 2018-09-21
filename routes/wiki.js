const express = require("express");
const router = express.Router();
const { addPage, wikiPage } = require("../views/");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  //res.send("got to GET /wiki/");
  res.redirect("/");
});

router.post("/", async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  // console.log(res.json(req.body.content));

	const page = new Page({
	title: req.body.title,
	content: req.body.content,
	status: req.body.status
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
	await page.save();
	res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
	next(error);
  }
});

router.get("/add", (req, res, next) => {
	res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
	try {
		const page = await Page.findOne({
			where: {
				slug: req.params.slug
			}
		});
		res.send(wikiPage(page));
} catch (error) { next(error)}
});

module.exports = router;
