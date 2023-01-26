const express = require('express');
const jwt = require('jsonwebtoken');
const Comment = require('./model');
const Reply = require('./model.replies');
const {
  BadRequestException,
  NotAuthorizedError,
  NotFoundError,
} = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const mongoose = require('mongoose');

// ! Postman must be used in https version

router.post(
  '/api/comments/vote-reply/:replyId',
  currentUser,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('Not Authorized');

    let userId;
    if (req.user) userId = mongoose.Types.ObjectId(req.user.id);
    else userId = mongoose.Types.ObjectId(req.currentUser.id);

    const reply = await Reply.findById(req.params.replyId);
    if (!reply) throw new NotFoundError('Reply Not Found!');

    // check if userId has already voted
    let userAlreadyVoted = false;
    for (let i = 0; i < reply.votesReferences.length; i++) {
      if (reply.votesReferences[i].toString() === userId.toString())
        userAlreadyVoted = true;
    }
    if (userAlreadyVoted)
      throw new BadRequestException("You've Already voted!");

    const { number } = req.body;

    // update vote -- add user in vote references
    reply.votes = reply.votes + number;
    reply.votesReferences = [...reply.votesReferences, userId];

    await reply.save();

    res.send(reply);
  }
);

module.exports = router;
