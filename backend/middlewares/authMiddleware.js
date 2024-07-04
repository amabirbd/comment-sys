// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if the Authorization header is provided
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided. Access denied.' });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token. Access denied.' });
  }
};
