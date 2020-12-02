const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote; 