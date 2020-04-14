// IMPORTS
const JWT = require("jsonwebtoken");

// FUNCTION
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (token) {
    JWT.verify(token, secret, (err, decodedToken) => {
      if (err) {
        //means token expired or is invalid
        res.status(401).json({ message: "authorization not valid!" });
      } else {
        //means token is good
        res.locals.decodedToken = decodedToken; // allows access to payload in token
        next(); //move on to the requested endpoint
      }
    });
  } else {
    res.status(401).json({ message: "Please log in or sign up!" });
  }
}
// EXPORTS
module.exports = authenticate;
