require('dotenv').config();
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "hello express-blog-api" });
});

module.exports = router
