require("dotenv").config();

// Required by bcrypt // let is know if someone has modify the token
const SECRET_KEY = process.env.SECRET_KEY || "my weak (!!) secret key"; // "the one you don't want people to know"
const BCRYPT_WORK_FACTOR = 12; // determines "strength" of hashing

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
