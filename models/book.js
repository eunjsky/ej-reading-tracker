const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: String
  },

  review: {
    type: String
  }
});

const bookSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },

  completed: {
    type: String,
    enum: ["YES", "NO", "READING"]
  },

  rating: {
    type: String
  },

  genre: {
    type: String
  },

  myreview: [reviewSchema]
});

module.exports = mongoose.model("Book", bookSchema);
