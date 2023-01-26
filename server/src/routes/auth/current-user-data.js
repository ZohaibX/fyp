const { NotAuthorizedError } = require('@zbtickets/common');
const express = require('express');
const currentUser = require('../../middlewares/current-user');
const { User } = require('./model/model');
const router = express.Router();

router.get(
  '/api/users/currentUserData',
  currentUser,
  async (req, res) => {
    // currentUser middleware will handle payload extraction from jwt

    let data ;
    if(req.currentUser)  data = await User.findById(req.currentUser.id)
    else if ( req.user ) data = req.user; 
    else data = null

    res.status(200).send({ data  });
  }
);

module.exports =  router;
