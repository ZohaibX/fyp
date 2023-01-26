const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const { User } = require('../auth/model/model');
const { validateAuthInput } = require('./validation/validate');
const Ad = require('./model/ad');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version

router.get('/api/ads/get-ad/:id', async (req, res) => {
  if (!req.params.id)
    throw new BadRequestException('Please Provide Ad Details');
  const ad = await Ad.findById(req.params.id);
  if (!ad)
    throw new BadRequestException('No Ad Found Against The Provided Details');

  res.status(201).send(ad);
});

module.exports = router;
