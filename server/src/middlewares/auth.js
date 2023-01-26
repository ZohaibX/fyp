const jwt = require('jsonwebtoken');

// This fn will run for every route and will set req.isAuth
// agr user authenticated ho gha . to req.isAuth true ho jae gha
module.exports = async (req, res, next) => {
  let token = req.headers['authorization'];
  token = token.substring(7, token.length);

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWTKEY);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // I can also add some more property like req.isAdmin property if decoded data has this property and i will have to pass that property to jwt signing
  req.isAuth = true;
  req.userId = decodedToken.id; //! check this if it is user_id or something other
  next();
};
