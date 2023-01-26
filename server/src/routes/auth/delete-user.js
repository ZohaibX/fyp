const express = require('express');
const router = express.Router();
require('dotenv').config();
const { User } = require('./model/model');

router.get('/api/users/delete-user/:email', async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email });

  res.send('done');
});

module.exports = router;
