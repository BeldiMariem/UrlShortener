const config = require("../../infrastructure/config/env");
const jwt = require("jsonwebtoken");
const blacklist = new Set();
exports.blacklist = blacklist;

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  if (blacklist.has(token)) {
    return res.status(401).json({ error: "Token has been logged out" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
