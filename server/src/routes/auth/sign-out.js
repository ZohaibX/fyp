const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/api/users/signOut', async (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(`${process.env.FRONTEND}/`); // redirect for passport auth
  // res.send('done');
});

module.exports = router;
