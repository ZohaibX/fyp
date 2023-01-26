const { BadRequestException } = require('@zbtickets/common');
const express = require('express');
const admin = require('../../../middlewares/admin');
const { User } = require('../model/model');
const router = express.Router();

router.get('/api/users/get-user-details/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new BadRequestException('No User Found!');

  res.send(user);
});

module.exports = router;
