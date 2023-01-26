const express = require('express');
const jwt = require('jsonwebtoken');
const { BadRequestException } = require('@zbtickets/common');
const { User } = require('./model/model');
const { validateAuthInput } = require('./validation/validate');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const { sendMail } = require('../../services/mailing/server');

// ! Postman must be used in https version

router.post('/api/users/signUp', async (req, res) => {
  let { firstName, lastName, email } = req.body;
  email = email.toLowerCase();
  let password = JSON.stringify(Math.floor(Math.random() * 80000000) + 1);

  const error = validateAuthInput({ firstName, lastName, email, password });
  if (error) throw new BadRequestException(error);

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestException('Email is already in use.');

  let role;
  if (email === process.env.ADMIN || email === process.env.ADMIN2)
    role = 'Admin';
  else role = 'User';

  //? password hashing is in service file and is executed in mongoose model file
  const user = User.build({ firstName, lastName, email, password, role });
  await user.save();

  //? Storing the token in a cookie -- session object
  // req.session.jwt = userJwt; //  -- thats how we store anything on a cookie --
  // commented the cookie so user doesn't automatically sign in because password will be sent to
  // email and it should be copied and pasted in SIGN IN page

  let caption = 'Password!';
  let text = `Your Password for the App is : ${password}`;
  // MAILING
  try {
    sendMail([user.email], caption, text);
  } catch (error) {
    throw new BadRequestError('error coming from sendgrid server');
  }

  res.status(201).send(user);
});

module.exports = router;
