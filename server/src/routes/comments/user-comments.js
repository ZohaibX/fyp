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
const mongoose = require('mongoose');

// ! Postman must be used in https version

router.get('/api/comments/get-user-comments', currentUser, async (req, res) => {
  if (!req.currentUser && !req.user)
    throw new NotAuthorizedError('Not Authorized');

  let userId, userTitle, userEmail;
  if (req.user) {
    userId = mongoose.Types.ObjectId(req.user.id);
    userTitle = req.user.username;
    userEmail = req.user.email;
  } else {
    userId = mongoose.Types.ObjectId(req.currentUser.id);
    userTitle = req.currentUser.username;
    userEmail = req.currentUser.email;
  }

  const comment = await Comment.find({ userId });

  res.send(comment);
});

module.exports = router;
