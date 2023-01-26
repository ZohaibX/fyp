const {
  NotAuthorizedError,
  BadRequestException,
} = require('@zbtickets/common');
const mongoose = require('mongoose');
const express = require('express');
const currentUser = require('../../../middlewares/current-user');
const { User } = require('../model/model');
require('dotenv').config();
const router = express.Router();
const admin = require('../../../middlewares/admin');
const Orders = require('../../foods/orders/model');
const Ads = require('../../ads/model/ad');
const { sendMail } = require('../../../services/mailing/server');

// get urls
router.post(
  '/api/users/delete-user/:id',
  // Replace
  admin,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('U r not authorized');

    let userId, role;
    if (req.user) {
      userId = req.user.id;
      role = req.user.role;
    } else if (req.currentUser) {
      userId = req.currentUser.id;
      role = req.currentUser.role;
    }

    if (!req.body.text)
      throw new BadRequestException('Message is not provided');

    const user = await User.findById(req.params.id);
    if (!user)
      throw new BadRequestException('User Not Found Against This Data');

    // user.orders
    let orders = [];
    for (const key in user.orders) {
      const order = await Orders.findById(user.orders[key]);
      orders.push(order);
    }

    for (const key in orders) {
      const userOrders = [...user.orders];
      const userOrderedItems = [...user.orderedItems];

      const index = userOrders.indexOf(orders[key].id);
      const index2 = userOrderedItems.indexOf(orders[key].itemId);

      user.orders.splice(index, 1);
      user.orderedItems.splice(index2, 1);
    }

    for (const key in orders) {
      try {
        await Orders.findByIdAndDelete(orders[key].id);
      } catch (error) {
        throw new Error();
      }
    }

    const ads = await Ads.find({ userId: user.id });

    for (const key in ads) {
      try {
        await Ads.findByIdAndDelete(ads[key].id);
      } catch (error) {
        throw new Error();
      }
    }

    user.blocked = true;

    user.save();

    let caption = 'Account Blocked!';
    let text = req.body.text;
    // MAILING
    try {
      sendMail([user.email], caption, text);
    } catch (error) {
      throw new BadRequestError('error coming from sendgrid server');
    }

    res.send('User is Deleted');
  }
);

module.exports = router;
