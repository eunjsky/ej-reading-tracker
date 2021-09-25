var express = require("express");
var router = express.Router();

const booksCtrl = require("../controllers/books");
const recommendCtrl = require("../controllers/recommends");

/* GET users listing. */

router.get("/", booksCtrl.allBookList);
router.get("/API", booksCtrl.showAPI);
router.post("/apibooks", booksCtrl.addApiBook);
router.get("/new", booksCtrl.addBook);
router.get("/:id", booksCtrl.detailOfBook);
router.post("/:id", booksCtrl.getReview);
router.post("/", booksCtrl.postBook);
router.get("/edit/:editIdnumber", booksCtrl.editBook);
router.post("/editBook/:editIdnumber", booksCtrl.editBookAndUpdate);
router.delete("/delete/:deleteBookIdNumber", booksCtrl.deleteBook);
router.delete("/:otherid/delete/:bookid", booksCtrl.deleteReview);

router.get("/:id/recommends/new", recommendCtrl.newRecommend);
router.post("/:id/books/new", recommendCtrl.addNewRecommend);

module.exports = router;
