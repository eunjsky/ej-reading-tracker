var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/books",
    failureRedirect: "/users"
  })
);

// OAuth logout route
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/books");
});

module.exports = router;
