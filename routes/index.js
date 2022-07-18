var express = require("express");
var router = express.Router();
const { ensureUserLoggedIn } = require("../middleware/guards");

/**
 * GET /
 **/

router.get("/", function (req, res) {
  res.send({ message: "Welcome to the AuthAuth homepage! Try /users" });
});

/**
 * GET /members-only
 **/

router.get("/members-only", ensureUserLoggedIn, function (req, res) {
  res.send({ message: "Here is your Members Only content from the server..." });
});

module.exports = router;
