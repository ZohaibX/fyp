const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const Items = require('./model');
const { User } = require('../auth/model/model');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const mongoose = require('mongoose');
const Food = require('./model');

// ! Postman must be used in https version

router.get('/api/ads/get-user-items', currentUser, async (req, res) => {
  if (!req.currentUser && !req.user)
    throw new NotAuthorizedError('Not Authorized');

  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    userId = req.currentUser.id;
  }

  const user = await User.findById(userId);
  if (!user) throw new BadRequestException('User not found!');

  let data = [];

  for (const key in user.likedAds) {
    let item = await Items.findById(user.likedAds[key]);
    data.push(item);
  }

  res.send(data);
});

router.get('/api/items/get-items-array', async (req, res) => {
  const species = req.body.species;
  if (!species) throw new BadRequestException('Bird Species are not provided!');

  const items = await Items.find();

  res.send(items);
});

module.exports = router;
