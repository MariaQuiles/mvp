const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/**
 * Guards are middleware that "protect" route functions
 **/

/**
 * Make sure the user is logged in
 **/

function ensureUserLoggedIn(req, res, next) {
  // if the user is logged in, do we find
  // implemented this in applicants, is working
  let token = _getToken(req);

  try {
    // Throws error on invalid/missing token
    jwt.verify(token, SECRET_KEY);
    // If we get here, a valid token was passed
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param
 **/

function ensureSameUser(req, res, next) {
  let token = _getToken(req);

  try {
    // Throws error on invalid/missing token // we need the payload cause we need to ckeck the user id
    let payload = jwt.verify(token, SECRET_KEY); // would throw an exception if the token is not there or if it has been modify
    // If we get here, a valid token was passed
    if (payload.userId === Number(req.params.userId)) {
      // user id in the payload be the same as the user id in the url "applicants/1"
      next(); // got here if the token is found // this is the next middleware function // could be the route or there might me something else
    } else {
      res.status(403).send({ error: "Forbidden" });
    }
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

function _getToken(req) {
  // do we find a valid token in the header??
  // Return '' if header not found
  if (!("authorization" in req.headers)) {
    return "";
  }

  // Split header into 'Bearer' and token
  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  return str === "Bearer" ? token : "";
}

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
};
