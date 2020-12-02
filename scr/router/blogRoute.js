const express = require("express");
const blogRouter = express.Router();
const debug = require("debug")("app:blogRoute");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const Category = require('../models/category');


// ---------- Blog Landing Post Page ----------
blogRouter.route("/").get((req, res) => {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    let perPgae = 7;
    let page = req.params.page || 1;
    Blog
      .find({ title: regex })
      .sort({ '_id': -1 })
      .exec((err, blog) => {
        if (err) {
          debug(err);
        } else {
          res.render('blog/landingpage', { blog: blog });
        }
      })
  } else {
    Blog
      .find({})
      .sort({ '_id': -1 })
      .exec((err, blog) => {
        if (err) {
          debug(err);
        } else {
          res.render("blog/landingpage", { blog: blog });
        }
      });
  }

});

// --------Create New Post -----------------//
blogRouter.route("/newpost").post((req, res) => {
  req.body.body = req.sanitize(req.body.body);
  const body = req.body.body;
  const title = req.body.title;
  const image = req.body.image;
  const imageDesc = req.body.imageDesc;
  const category = JSON.parse(req.body.category);
  const newllyBlog = {
    title: title,
    body: body,
    image: image,
    imageDesc: imageDesc,
    category: category
  };
  console.log(newllyBlog);
  Blog.create(newllyBlog, (err, newBlog) => {
    console.log(err);
    if (err) {
      Category.find((err, categories) => {
        if (err) {
          debug(err);
        } else {
          res.render("blog/newpost", { categories: categories });
        }
      })
    } else {
      blog.save();
      category.blogs.push(blog);
      category.save();
      res.redirect("/blog");
    }
  });
});
// ----------- SHow Post ------------
blogRouter.route("/:id").get((req, res) => {
  Blog.findById({ _id: req.params.id })
    .populate("comments")
    .exec((err, foundBlog) => {
      if (err) {
        debug(err);
      } else {
        res.render("blog/show", { blog: foundBlog });
      }
    });
});
// ------------- Update Post ------------
blogRouter.route("/:id").put((req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      debug(err);
    } else {
      res.redirect("/blog/" + req.params.id);
    }
  });
});
// ----------- Destroy Post ------------------
blogRouter.route("/:id").delete((req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
    if (err) {
      debug(err);
      res.redirect("/blog/" + req.params.id);
    } else {
      res.redirect("/blog");
    }
  });
});
// ------------- Post Comment ------------------
blogRouter.route("/:id/comments").post((req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      debug(err);
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          debug(err);
        } else {
          comment.save();
          blog.comments.push(comment);
          blog.save();
          res.redirect("/blog/" + blog._id);
        }
      });
    }
  });
});
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = blogRouter;
