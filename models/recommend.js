const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recommendSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  genre: {
    type: String
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book"
  }
});
//list []
module.exports = mongoose.model("Recommend", recommendSchema);
