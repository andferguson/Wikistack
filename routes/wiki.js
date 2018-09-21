const express = require("express");
const router = express.Router();
const { addPage, wikiPage } = require("../views/");
const { Page } = require("../models");
const { User } = require("../models");

router.get("/", (req, res, next) => {
  res.redirect("/");
});

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
	});

  try {
		const [user, wasCreated] = await User.findOrCreate({
			where: {
				name: req.body.author,
				email: req.body.email
			}
		});

		page.authorId = user.id;

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
    res.send(wikiPage(page, await page.getAuthor()));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
