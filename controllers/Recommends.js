const Recommend = require("../models/recommend");
const Book = require("../models/book");

function newRecommend(req, res) {
  const findBookId = req.params.id;
  console.log(findBookId);
  res.render("recommend/new", { findBookId });
}

async function addNewRecommend(req, res) {
  const recommend = new Recommend({ ...req.body, book: null });
  const findBookId = req.params.id;

  recommend.book = findBookId;
  await recommend.save();
  console.log(recommend);
  // for now, redirect right back to new.ejs
  res.redirect(`/books/${findBookId}`);
}

module.exports = {
  newRecommend,
  addNewRecommend
};
