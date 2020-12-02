const express = require('express');
const categoryRoute = express.Router();
const debug = require('debug')('app:categoryRoute');
const Category = require('../models/category');
const Blog = require('../models/blog');

categoryRoute.route('/').post((req, res) => {
    Category.find((err, category) => {
        if (err) {
            debug(err);
        } else {
            res.render('admin/category/newcategory', { category: category });
        }
    })
});

categoryRoute.route('/new').post((req, res) => {
    Category.create(req.body, (err, newCategory) => {
        if (err) {
            debug(err);
            console.log(err);
        } else {
            res.send('New Category created!');
        }
    });
});

module.exports = categoryRoute;