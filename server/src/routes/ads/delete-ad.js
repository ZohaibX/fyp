const {
  NotAuthorizedError,
  BadRequestException,
} = require('@zbtickets/common');
const mongoose = require('mongoose');
const express = require('express');
const currentUser = require('../../middlewares/current-user');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const Ad = require('./model/ad');
require('dotenv').config();
const router = express.Router();

// get urls
router.delete(
  '/api/ads/delete-ad/:id',
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

    const ad = await Ad.findById(req.params.id);
    if (!ad) throw new BadRequestException('Ad Not Found Against This Data');

    if (
      JSON.stringify(ad.userId) !== JSON.stringify(userId) &&
      role !== 'Admin'
    )
      throw new NotAuthorizedError(
        "You don't have enough permissions to perform this task"
      );

    try {
      await Ad.findByIdAndDelete(req.params.id);
    } catch (error) {
      throw new Error();
    }

    res.send('Ad is Deleted');
  }
);

// get urls
router.delete(
  '/api/ads/delete-all-ads/',
  // Replace
  async (req, res) => {
    await Ad.deleteMany();

    res.send('Ad is Deleted');
  }
);

module.exports = router;
