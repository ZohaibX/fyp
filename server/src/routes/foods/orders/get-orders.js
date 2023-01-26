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

// ! Postman must be used in https version

router.get('/api/ads/get-all-orders', admin, async (req, res) => {
  const orders = await Orders.find({ completed: false });
  // await Orders.deleteMany();

  res.status(201).send(orders);
});

module.exports = router;
