const { Password } = require('./password-hashing/hashing');
const express = require('express');
const jwt = require('jsonwebtoken');
const { BadRequestException } = require('@zbtickets/common');
const { User } = require('./model/model');
const { validateAuthInput } = require('./validation/validate');
require('dotenv').config(); //? to use dotenv file
const router = express.Router();

//! Postman must be used in https version

router.post('/api/users/signIn', async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  const error = validateAuthInput({ email, password });
  if (error) throw new BadRequestException(error);
  //? using next(error) -- error will directly go to the error handling middleware and catch the error and we can send valid responses

  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestException('Invalid Credentials');
  //? using next(error) - error will directly go to the error handling middleware and catch the error and we can send valid responses

  if (existingUser.blocked)
    throw new BadRequestException('Account is blocked by administration');

  const passwordMatch = await Password.compare(existingUser.password, password);
  if (!passwordMatch) throw new BadRequestException('Invalid Credentials');
  //? using next(error) - error will directly go to the error handling middleware and catch the error and we can send valid responses

  //? Generating a JWT token
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      role: existingUser.role,
      blocked: existingUser.blocked,
      completed_profile: existingUser.completed_profile,
      phoneNumber: existingUser.phoneNumber,
      city: existingUser.city,
      likedBirds: existingUser.likedBirds,
      rated: existingUser.rated,
      interests: existingUser.interests,
    },
    process.env.JWTKEY,
    { expiresIn: '1h' }
  );

  //? Storing the token in a cookie -- session object
  req.session.jwt = userJwt;

  // now this cookie will be automatically send with this route -- as a cookie
  //? cookies will only show up on https -- so we can use https://ticketing.dev/api/users/signUp

  // we will get a long encrypted string, we will take that string to base64decode.org and decode it and then we will get our jwt

  res.status(200).send(existingUser);
});

module.exports = router;
