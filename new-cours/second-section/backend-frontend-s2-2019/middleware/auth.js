const jwt = require("jsonwebtoken");
const config = require("config");

// Basic authorize
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check is not token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token authorization denied" }] });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ errors: [{ msg: "Token is not valid. authorization denied" }] });
  }
};
