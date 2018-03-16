var express = require("express");
var router = express.Router();
var mangoose = require("mongoose");
var Books = require("../models/books");


/* GET books listing. */
router.get("/", async function(req, res) {
  try {
    const booksList = await Books.find({}).exec();
    res.send(booksList);
  } catch(err) {
    res.send(err);
  }
});
router.get("/:id", async function(req, res) {
  try {
    const oneResult = await Books.findById(req.params.id).exec();
    res.send(oneResult);
  } catch (err) {
    res.send(err);
  }
});

router.post("/:title", async function(req, res) {
  let newEntry = new Books({
    title: req.body.title,
    author: req.body.author
  });
  try {
    await newEntry.save();
    res.send({ message: `create new book using data from ${req.body.title}` });
  } catch (err) {
    res.send(err);
  }
});

router.put("/:title", async function(req, res) {
  try {
    const addEdit = await Books.findOneAndUpdate(
      req.params.title,
      req.body
    ).exec();
    res.send({ message: `update book with id ${req.params.id}` });
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:title", async function(req, res) {
  try {
    const toDelete = await Books.deleteMany({ title: req.params.title }).exec();
    res.send({ message: `delete book with title ${req.params.title}` });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router
