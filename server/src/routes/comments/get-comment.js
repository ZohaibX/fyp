const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const Comment = require('./model');
const { User } = require('../auth/model/model');
const Reply = require('./model.replies');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version

router.get('/api/comments/get-comment/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  res.send(comment);
});

router.get('/api/comments/get-reply/:id', async (req, res) => {
  const reply = await Reply.findById(req.params.id);

  res.send(reply);
});

module.exports = router;
