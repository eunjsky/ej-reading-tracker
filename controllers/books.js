const Book = require("../models/book");
const Recommend = require("../models/recommend");
const request = require("request");

//all book list show
function allBookList(req, res) {
  Book.find(function(err, books) {
    res.render("books/index", { books });
  });
}

//new page to add a book
function addBook(req, res) {
  res.render("books/new");
}

//POST, add on the book list
function postBook(req, res) {
  const book = new Book(req.body);

  book.save(function(err) {
    // one way to handle errors
    if (err)
      return res.render("error", {
        message: "something went wrong :(",
        error: err
      });
    console.log(book);
    // for now, redirect right back to new.ejs
    res.redirect(`/books`);
  });
}

// add review
function getReview(req, res) {
  Book.findById(req.params.id, function(err, book) {
    book.myreview.push(req.body);
    book.save(function(err) {
      res.redirect(`/books/${book.id}`);
    });
  });
}

// show the details of book
function detailOfBook(req, res) {
  Book.findById(req.params.id, function(err, book) {
    Recommend.find({ book: book._id }, function(err, recommend) {
      res.render("books/detail", { book, recommend });
    });
  });
  //   res.render("books/detail");
}

//update(edit) the book
async function editBook(req, res) {
  const bookInfo = await Book.findById(req.params.editIdnumber);
  res.render("books/edit", { book: bookInfo });
}

async function editBookAndUpdate(req, res) {
  const updateBook = await Book.findByIdAndUpdate(req.params.editIdnumber, {
    title: req.body.title,
    author: req.body.author,
    completed: req.body.completed,
    rating: req.body.rating,
    genre: req.body.genre
  });
  await updateBook.save();
  console.log(updateBook);
  res.redirect("/books");
}

//delete the book
async function deleteBook(req, res) {
  let deleteOneBook = await Book.deleteOne({
    _id: req.params.deleteBookIdNumber
  });
  res.redirect("/books");
}

//delete the review
async function deleteReview(req, res) {
  let book = await Book.findById(req.params.bookid);
  book.myreview.id(req.params.otherid).remove();
  await book.save();

  res.redirect(`/books/${req.params.bookid}`);
}

// function showAPI(req, res) {
//   request(
//     "https://openlibrary.org/authors/OL1394244A/works.json?limit=100",
//     function(error, response, body) {
//       console.error("error:", error);
//       console.log("statusCode:", response && response.statusCode);
//       console.log("body:", body);
//       console.log("the JSON parse of the body");
//       const bookData = JSON.parse(body);
//       console.log(bookData);
//       res.render("books/API", { bookData });
//     }
//   );
// }
function showAPI(req, res) {
  const options = {
    url:
      "https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=tqeyUtgaDJvHGhKtBgwwj8Tgr4hI3Irc",
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  };
  request(options, function(error, response, body) {
    console.error("error:", error);
    //console.log("statusCode:", response && response.statusCode);
    //console.log("body:", body);
    //console.log("the JSON parse of the body");
    const bookData = JSON.parse(body);
    console.log(bookData.results[0].book_details);
    res.render("books/API", { bookData: bookData.results });
  });
}

async function addApiBook(req, res) {
  console.log(req.body);
  let newBook = new Book(req.body);
  await newBook.save();
  res.redirect("/books");
}

module.exports = {
  allBookList,
  addBook,
  postBook,
  getReview,
  detailOfBook,
  editBook,
  editBookAndUpdate,
  deleteBook,
  showAPI,
  addApiBook,
  deleteReview
};
