const { NotAuthorizedError } = require('@zbtickets/common');

const jwt = require('jsonwebtoken');

const currentUser = (req, res, next) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWTKEY);
    req.currentUser = payload;
  } catch (err) {
    NotAuthorizedError('Not Authorized!');
  }

  if (req.currentUser.role !== 'Admin')
    throw new NotAuthorizedError('Not Authorized !!');

  next();
};

module.exports = currentUser;
