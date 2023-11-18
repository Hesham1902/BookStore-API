const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publication_year: {
    type: Number,
  },
  genre: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      _id: false,
      name: String,
      body: String,
    },
  ],
});

const Book = mongoose.model("books", bookSchema);

module.exports = Book;
