const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.comtaxLoginToken;
  }

  // Make sure token exists
  if (!token) {
    res
      .status(401)
      .json({ success: false, msg: 'Not authorized to access this route' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, msg: 'Not authorized to access this route' });
    return;
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res
        .status(403)
        .json({
          success: false,
          msg: 'User role ${req.user.role} is not authorized to access this route'
        });
      return;
    }
    next();
  };
};
