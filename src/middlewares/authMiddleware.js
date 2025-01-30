const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.authToken; // Get the token from the cookie
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user; // Add user information to the request
    next();
  });
}

module.exports = { authenticateToken };
