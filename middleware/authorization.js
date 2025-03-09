const jwt = require("jsonwebtoken");

const authorization = (role) => (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied: Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== role) {
      return res.status(403).json({ message: "Access denied: Invalid role" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

module.exports = authorization;
