const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get Token From Header
  const token = req.header("x-auth-token");

  // Checks for no token
  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization Denied" });
  }

  // Verifies Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.name = decoded.name;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is Not Valid" });
  }
};