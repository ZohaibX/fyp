const express = require("express")
const jwt = require('jsonwebtoken');
const { BadRequestException } = require('@zbtickets/common');
const { User } = require('../model/model');
const { validateAuthInput } = require('../validation/validate');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const {sendMail} = require("../../../services/mailing/server")
const admin = require('../../../middlewares/admin');
// ! Postman must be used in https version

router.post(
  '/api/users/ban-user/:id',
  admin, 
  async (req, res ) => {
    let { caption, text } = req.body;
    let id = req.params.id;

    const user = await User.findById(id);
    if (!user) throw new BadRequestException('User is not available! Sir.');
    if (user.role === "Admin") throw new BadRequestException("Auqaat mai raho bhai !!")

    user.blocked = true;
    await user.save()

    // MAILING 
    try {
      sendMail([user.email] , caption, text) 
    } catch (error) {
      throw new BadRequestError("error coming from sendgrid server")
    }
   
    res.send("Message has been sent!!");
  }
);

module.exports = router;