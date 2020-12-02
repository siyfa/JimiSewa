const express = require("express");
const adminRouter = express.Router();
const debug = require("debug")("app:adminRoute");
const Blog = require("../models/blog");
const Book = require("../models/book");
const Category = require('../models/category');

// -------------- Admin Dashboard Page -----------
adminRouter.route("/dashboard").get((req, res) => {
  res.render("admin/dashboard");
});

// -------------- Admin Dashboard Post Page -----------
adminRouter.route("/dashboard/post").get((req, res) => {
  res.render("admin/post", { blog: Blog });
});

// ---------------Create New Category ----------------
adminRouter.route('/dashboard/category').get((req, res) => {
  res.render('admin/category/newcategory');
})

//  ---------- Create New Blog --------
adminRouter.route("/dashboard/newpost").get((req, res) => {
  Blog.find((err, blogs) => {
    if (err) {
      debug(err);
    } else {
      Category.find((err, categories) => {
        if (err) {
          debug(err);
        } else {
          res.render("blog/newpost", { blog: blogs, categories: categories });
        }
      })
    }
  });
});
// --------------- Create New Book -----------
adminRouter.route("/dashboard/newbook").get((req, res) => {
  Book.find((err, books) => {
    if (err) {
      debug(err);
      res.redirect("/admin/dashboard/newbook");
    } else {
      res.render("book/newbook");
    }
  });
});
// ----------- Edit Post  Details-------------
adminRouter.route("/dashboard/:id/editpost").get((req, res) => {
  Blog.findById(req.params.id, (err, editBlog) => {
    if (err) {
      debug(err);
    } else {
      res.render("blog/editpost", { blog: editBlog });
    }
  });
});
// ------------ Edit Book Details --------------
adminRouter.route("/dashboard/:id/editbook").get((req, res) => {
  Book.findById(req.params.id, (err, editBook) => {
    if (err) {
      debug(err);
    } else {
      res.render("book/editbook", { book: editBook });
    }
  });
});

module.exports = adminRouter;
