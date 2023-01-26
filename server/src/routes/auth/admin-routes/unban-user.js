const express = require('express');
const jwt = require('jsonwebtoken');
const { BadRequestException } = require('@zbtickets/common');
const { User } = require('../model/model');
const { validateAuthInput } = require('../validation/validate');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const { sendMail } = require('../../../services/mailing/server');
const admin = require('../../../middlewares/admin');
// ! Postman must be used in https version

router.post('/api/users/un-ban-user/:email', admin, async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) throw new BadRequestException('User is not available! Sir.');

  if (!user.blocked)
    throw new BadRequestException('User is not blocked already! Sir.');

  user.blocked = false;
  await user.save();

  let caption = 'Account Unblocked!';
  let text = 'Your Account has been unblocked.';
  // MAILING
  try {
    sendMail([user.email], caption, text);
  } catch (error) {
    throw new BadRequestError('error coming from sendgrid server');
  }

  res.send('User is Unblocked!!');
});

module.exports = router;
