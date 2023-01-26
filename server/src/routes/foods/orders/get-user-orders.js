const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const currentUser = require('../../../middlewares/current-user');
const Orders = require('./model');
const { User } = require('../../auth/model/model');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const mongoose = require('mongoose');
const Items = require('../model');

// ! Postman must be used in https version

router.get('/api/ads/get-user-orders', currentUser, async (req, res) => {
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
  for (const key in user.orders) {
    let order = await Orders.findById(user.orders[key]);
    let item = await Items.findById(order.itemId);
    data.push({ order, item });
  }

  res.send(data);
});

module.exports = router;
