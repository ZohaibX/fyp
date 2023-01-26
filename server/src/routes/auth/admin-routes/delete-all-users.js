const {
  NotAuthorizedError,
  BadRequestException,
} = require('@zbtickets/common');
const mongoose = require('mongoose');
const express = require('express');
const currentUser = require('../../../middlewares/current-user');
const { User } = require('../model/model');
require('dotenv').config();
const router = express.Router();
const admin = require('../../../middlewares/admin');

const { sendMail } = require('../../../services/mailing/server');

// get urls
router.delete(
  '/api/users/delete-all-user',
  // Replace
  admin,
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

    await User.deleteMany();

    res.send('User is Deleted');
  }
);

module.exports = router;
