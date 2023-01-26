const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const Items = require('./model');

// ! Postman must be used in https version

router.get('/api/ads/get-item/:id', async (req, res) => {
  const ad = await Items.findById(req.params.id);
  if(!ad) throw new BadRequestException("Item not Found")

  res.status(201).send(ad);
});

module.exports = router;
