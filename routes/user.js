const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("got to GET /user/");
});

router.get("/:id", (req, res, next) => {
  res.send("got to GET /user/:id");
});

router.post("/", (req, res, next) => {
  res.send("got to POST /user/");
});

router.put("/:id", (req, res, next) => {
  res.send("got to POST /user/:id");
});

router.delete("/:id", (req, res, next) => {
  res.send("got to POST /user/:id");
});

module.exports = router;
