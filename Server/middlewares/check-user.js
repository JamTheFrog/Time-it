const keys = require("../keys/keys");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, keys.JWT_SECRET_KEY);
    req.currentUser = decodedToken;
    console.log(decodedToken)
  } catch (error) {}

  next();
};