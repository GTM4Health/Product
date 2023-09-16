const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to the request object
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Authentication failed', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticate;
