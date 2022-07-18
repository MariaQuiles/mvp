var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards"); // remember always to define guards and where are we using it from

function joinToJson(results) {
  // Create array of applicants objs
  let applicants = results.data.map((row) => ({
    applicant_id: row.applicant_id,
    applicantname: row.applicantname,
    // email: row.email, // not needed because tables changed
    cv: row.cv,
  }));
  // Create posts obj from first row
  let row0 = results.data[0];
  let posts = {
    post_ID: row0.post_id,
    company: row0.company,
    title: row0.title,
    postDescription: row0.postdescription,
    applicants,
  };
  return posts;
}

/* GET applicants list */
router.get("/", function (req, res, next) {
  db("SELECT * FROM applicants;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET posts with left join to applicants*/
router.get("/:id", async function (req, res, next) {
  // ensureSameUser if the user is permitted to call this router
  let sql = `SELECT posts.*, posts_applicants.* , applicants.*
  FROM posts LEFT JOIN posts_applicants ON posts.post_id = posts_applicants.ref_post_id 
  LEFT JOIN applicants ON posts_applicants.ref_applicant_id = applicants.applicant_id  WHERE posts.post_id = ${req.params.id} 
  `;

  try {
    let results = await db(sql);
    // res.send(results.data);
    res.send(joinToJson(results));
  } catch (err) {
    res.status(500).send(err);
  }
});

/* POST method */
router.post("/", async function (req, res, next) {
  const { applicantname, email, cv, post_id } = req.body;
  const emailFound = await db(
    `SELECT email FROM users WHERE email = '${req.body.email}'`
  );

  if (emailFound.data.length > 0) {
    // POST applicant id and posts id (saved in userHomeView) to posts_applicants table
    let appid = await db(`SELECT user_id FROM users WHERE email = '${email}'`);
    appid = appid.data[0].user_id;

    await db(
      `INSERT INTO posts_applicants (ref_post_id, ref_applicant_id, accepted) VALUES (${post_id},${appid},null);`
    );
    // res.send(`SELECT * FROM posts_applicants`);
  } else {
    const sql = `INSERT INTO applicants (applicantname, cv) VALUES ('${applicantname}','${cv}')`; // tooked email out (don't belong to applicants anymore)

    try {
      await db(sql);
      let results = await db("SELECT * FROM applicants");
      res.send(results.data);
    } catch (err) {
      res.status(500).send(err);
    }

    //POST applicant id and posts id (saved in userHomeView) to posts_applicants table
    const id = await db(
      `SELECT user_id FROM users WHERE email = '${req.body.email}'`
    );
    let appid = await db(`SELECT user_id FROM users WHERE email = '${email}'`);
    appid = appid.data[0].applicant_id;

    await db(
      `INSERT INTO posts_applicants (ref_post_id, ref_applicant_id, accepted) VALUES (${post_id},${appid},0);`
    );
  }
});

module.exports = router;
