const express = require("express");
const bookRouter = express.Router();
const debug = require("debug")("app:bookRouter");
const Book = require("../models/book");

// ----------- Landing Book Page -------------
bookRouter.route("/").get((req, res) => {
  Book.find((err, book) => {
    if (err) {
      debug(err);
    } else {
      res.render("book/landingpage", { book: book });
    }
  });
});
// ----------- Post New Book --------------
bookRouter.route("/newbook").post((req, res) => {
  req.body.book.review = req.sanitize(req.body.book.review);
  const newllyBook = req.body.book;
  Book.create(newllyBook, (err, newBook) => {
    if (err) {
      debug(err);
      res.render("book/newbook");
    } else {
      res.redirect("/book");
    }
  });
});
// ---------- Show Book Page -------------
bookRouter.route("/:id").get((req, res) => {
  Book.findById({ _id: req.params.id }, (err, foundBook) => {
    if (err) {
      debug(err);
    } else {
      res.render("book/show", { book: foundBook });
    }
  });
});
// ----------- Update Book Details ----------------
bookRouter.route("/:id").put((req, res) => {
  req.body.book.review = req.sanitize(req.body.book.review);
  Book.findByIdAndUpdate(req.params.id, req.body.book, (err, updatedBlog) => {
    if (err) {
      debug(err);
    } else {
      res.redirect("/book/" + req.params.id);
    }
  });
});
// ---------- Destroy Book ----------------
bookRouter.route("/:id").delete((req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    if (err) {
      debug(err);
      res.redirect("/book/" + req.params.id);
    } else {
      res.redirect("/book");
    }
  });
});

module.exports = bookRouter;
