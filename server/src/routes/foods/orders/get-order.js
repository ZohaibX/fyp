const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const Orders = require('./model');

// ! Postman must be used in https version

router.get('/api/ads/get-order/:id', async (req, res) => {
  const ad = await Orders.findById(req.params.id);
  if(!ad) throw new BadRequestException("Item not found!")

  res.status(201).send(ad);
});

module.exports = router;
