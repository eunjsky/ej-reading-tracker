const User = require("../models/user");

function index(req, res) {
  res.render("users/index", { user: req.user });
}

module.exports = {
  index
};
