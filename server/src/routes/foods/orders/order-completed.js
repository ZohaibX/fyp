const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const Orders = require('./model');
const admin = require('../../../middlewares/admin');
const { sendMail } = require('../../../services/mailing/server');
const { User } = require('../../auth/model/model');
const Item = require('../model');

// ! Postman must be used in https version

router.put('/api/order/order-completed/:orderId', admin, async (req, res) => {
  const order = await Orders.findById(req.params.orderId);
  if (!order)
    throw new BadRequestException(
      'Something Went Wrong While Completing Order'
    );

  order.completed = true;
  await order.save();

  let user = await User.findById(order.userId);
  if (!user)
    throw new BadRequestException(
      'Something Went Wrong While Completing Order'
    );

  let testOrders = [...user.orders];
  let testItems = [...user.orderedItems];

  let index1 = testOrders.indexOf(req.params.orderId);
  let index2 = testItems.indexOf(order.itemId);

  user.orders.splice(index1, 1);
  user.orderedItems.splice(index2, 1);

  await user.save();

  let caption = 'Order Completed!';
  let text = `Your Order with ID ${req.params.orderId}: ${order.itemTitle} is marked Completed. Thank You.`;
  // MAILING
  try {
    sendMail([user.email], caption, text);
  } catch (error) {
    throw new BadRequestError('error coming from sendgrid server');
  }

  res.status(201).send('Order is marked Completed');
});

module.exports = router;
