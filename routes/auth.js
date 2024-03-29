var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");

/**
 * Log in an applicant
 **/

router.post("/login", async (req, res) => {
  // this is enough to test on postman
  let { email, password } = req.body; // data required in the body

  try {
    let results = await db(`SELECT * FROM users WHERE email = '${email}'`); // because I need to verify the info from the applicants, so I select it
    if (results.data.length === 0) {
      // email not found
      res.status(401).send({ error: "Login failed" });
    } else {
      let user = results.data[0]; // the user's row/record from the DB
      let passwordsEqual = await bcrypt.compare(password, user.password); // comparing to the data already storaged, this is before registration but we added some default data.
      if (passwordsEqual) {
        // Passwords match
        let payload = { userId: user.id }; // is this called user.id always? or do I have to use this project "appid"
        // Create token containing user ID
        let token = jwt.sign(payload, SECRET_KEY);
        // Also return user (without password)
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token, // what would this say? what will contain? header, payload and signature as a whole?
          user: user, // the email? the name?
        });
      } else {
        // Passwords don't match
        res.status(401).send({ error: "Login failed" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Register a user
 **/

router.post("/register", async (req, res) => {
  let { fullname, email, password } = req.body; // when someones registers it uses information from the body
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR); // create the hashed version of password
  // should i try if user already exists?
  try {
    let sql = `
          INSERT INTO users (fullname, email, password, isadmin)
          VALUES ('${fullname}', '${email}', '${hashedPassword}', 0)
      `; // inserts user data with hased password
    await db(sql);
    res.send({ message: "Registration succeeded" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
