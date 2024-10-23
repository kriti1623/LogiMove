const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || '';

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  //console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }



  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
