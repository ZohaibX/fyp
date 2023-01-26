const {
  NotAuthorizedError,
  BadRequestException,
} = require('@zbtickets/common');
const mongoose = require('mongoose');
const express = require('express');
const currentUser = require('../../../middlewares/current-user');
const Orders = require('./model');
require('dotenv').config();
const router = express.Router();
const { User } = require('../../auth/model/model');

// get urls
router.delete(
  '/api/ads/delete-order/:id',
  // Replace
  currentUser,
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

    const order = await Orders.findById(req.params.id);
    if (!order) throw new BadRequestException('Ad Not Found Against This Data');

    let user;
    if (role !== 'Admin') {
      user = await User.findById(userId);
    } else {
      user = await User.findById(order.userId);
    }
    if (!user) throw new NotAuthorizedError();

    if (!user.orders.includes(order.id))
      throw new BadRequestException('Bad Request');

    try {
      await Orders.findByIdAndDelete(req.params.id);
    } catch (error) {
      throw new Error();
    }

    const userOrders = [...user.orders];
    const userOrderedItems = [...user.orderedItems];
    const index = userOrders.indexOf(order.id);
    const index2 = userOrderedItems.indexOf(order.itemId);
    user.orders.splice(index, 1);
    user.orderedItems.splice(index2, 1);
    await user.save();

    res.send('Order is Deleted');
  }
);

module.exports = router;
