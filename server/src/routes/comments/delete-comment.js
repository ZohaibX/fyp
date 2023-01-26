const express = require('express');
const Comment = require('./model');
const Reply = require('./model.replies');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {
  BadRequestException,
  NotAuthorizedError,
  NotFoundError,
} = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version

// ADMIN CAN ALSO DELETE COMMENTS/REPLIES
router.delete(
  '/api/comments/delete-comment/:commentId',
  currentUser,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('Not Authorized');

    let userId, role;
    if (req.user) {
      userId = mongoose.Types.ObjectId(req.user.id);
      role = req.user.role;
    } else if (req.currentUser) {
      userId = mongoose.Types.ObjectId(req.currentUser.id);
      role = req.currentUser.role;
    }

    // check if comment exists
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) throw new BadRequestException('No Comment Found');

    // check if comment belongs to the user
    if (role !== 'Admin' && comment.userId.toString() !== userId.toString()) {
      throw new NotAuthorizedError('You are not authorized');
    }

    // delete comment replies
    for (let i = 0; i < comment.replies.length; i++) {
      await Reply.findByIdAndDelete(comment.replies[i]);
    }

    // delete comment
    try {
      await Comment.findByIdAndDelete(req.params.commentId);
    } catch (error) {
      throw new Error(error);
    }

    res.send('Deleted');
  }
);
router.delete(
  '/api/comments/delete-reply/:commentId/:replyId',
  currentUser,
  async (req, res) => {
    // also deletes it in comments' replies

    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('Not Authorized');

    let userId, role;
    if (req.user) {
      userId = mongoose.Types.ObjectId(req.user.id);
      role = req.user.role;
    } else if (req.currentUser) {
      userId = mongoose.Types.ObjectId(req.currentUser.id);
      role = req.currentUser.role;
    }

    // check if reply exists
    const reply = await Reply.findById(req.params.replyId);
    if (!reply) throw new BadRequestException('No Reply Found');

    // check if reply belongs to the user
    if (role !== 'Admin' && reply.userId.toString() !== userId.toString())
      throw new NotAuthorizedError();

    // delete
    try {
      await Reply.findByIdAndDelete(req.params.replyId);
    } catch (error) {
      throw new Error(error);
    }

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) throw new Error();

    const index = comment.replies.indexOf(reply.id);
    comment.replies.splice(index, 1);
    comment.save();

    res.send('Reply is Deleted');
  }
);

module.exports = router;
