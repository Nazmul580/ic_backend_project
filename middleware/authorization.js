const jwt = require("jsonwebtoken");
const authorization = (role) => (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(401).json({ message: "access denied" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== role)
      return res.status(403).json({ message: "access denied invalid role" });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = authorization;
