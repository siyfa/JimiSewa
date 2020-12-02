const express = require('express');
const quoteRoute = express.Router();
const debug = require('debug')('app:quoteRoute');
const Quote = require('../models/quote');

quoteRoute.route('/').get((req, res) => {
    Quote.find((err, quote) => {
        if (err) {
            debug(err);
        } else {
            res.send('Quote Page Here!')
        }
    })
})

module.exports = quoteRoute;