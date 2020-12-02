const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  image: String,
  imageDesc: String,
  link: String,
  review: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
