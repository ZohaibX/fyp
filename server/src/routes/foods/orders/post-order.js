const {
  NotAuthorizedError,
  BadRequestException,
} = require('@zbtickets/common');
const express = require('express');
const currentUser = require('../../../middlewares/current-user');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const Order = require('./model');
const { default: mongoose } = require('mongoose');
const { User } = require('../../auth/model/model');
const { insertMany } = require('./model');
require('dotenv').config();
const router = express.Router();
const Item = require('../model');
const Orders = require('./model');

router.post(
  '/api/ads/order-upload/:itemId',
  // add admin here
  currentUser,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('Not Authorized');

    let userId, role;
    if (req.user) {
      userId = req.user.id;
    } else if (req.currentUser) {
      userId = req.currentUser.id;
    }

    const { city, phoneNumber, address } = req.body;
    if (!city || !phoneNumber || !address)
      throw new BadRequestException('Please Enter Details');

    const user = await User.findById(userId);
    if (!user) throw new NotAuthorizedError();

    const item = await Item.findById(req.params.itemId);
    if (!item) throw new BadRequestException('Something Went Wrong');

    const order = Order.build({
      itemId: req.params.itemId,
      userId: userId,
      city,
      phoneNumber,
      address,

      itemTitle: item.title,
      itemBirdName: item.birdName,
      itemBreedName: item.breedName,
      itemPrice: item.price,
      userEmail: user.email,
      username: user.username,
    });
    await order.save();

    user.orders.push(order.id);
    user.orderedItems.push(req.params.itemId);
    user.save();

    res.send(order);
  }
);

module.exports = router;
