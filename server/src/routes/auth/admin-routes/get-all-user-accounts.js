const express = require('express');
const admin = require('../../../middlewares/admin');
const { User } = require('../model/model');
const router = express.Router();
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');

router.get('/api/users/get-all-user-accounts', async (req, res) => {
  const accounts = await User.find({ role: 'User', blocked: false });
  if (!accounts.length) throw new BadRequestException("Some Error Occured in Orders.tsx")

  res.send(accounts);
});

module.exports = router;
