const { NotAuthorizedError , BadRequestException} = require('@zbtickets/common');
const express = require('express');
const currentUser = require('../../middlewares/current-user');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const Item = require('./model');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const router = express.Router();
const admin = require('../../middlewares/admin');

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_PUBLIC,
  secretAccessKey: process.env.AWS_PRIVATE,
});

// get url
// '/api/ads/ad-upload/get-url/'

router.post(
  '/api/ads/item-upload/',
  // add admin here
  admin,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('Not Authorized');

    let userId, role;
    if (req.user) {
      userId = req.user.id;
      role = req.user.role;
    } else if (req.currentUser) {
      userId = req.currentUser.id;
      role = req.currentUser.role;
    }

    if (role !== 'Admin')
      throw new NotAuthorizedError(
        "You don't have enough permissions to perform this task"
      );

    // userId = mongoose.Types.ObjectId('62cb7681fc043b1d716e00b7'); // Fake

    const { type, title, description, price, images, specie, birdName,  birdAge, quantity } =
      req.body;
    if(!title || !type || !description || !price || !images.length || !birdName , !birdAge) throw new BadRequestException("Something is not provided")
    // images is an array -- of string (url)

    /// https://trade-the-bird.s3.amazonaws.com/[Image Key] -- Save This
    let imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      imageUrls.push(
        `https://trade-the-bird-x.s3.amazonaws.com/${images[i].key}`
      );
    }

    const ad = Item.build({
      type,
      title,
      specie,
      birdName ,
      birdAge,
      description,
      price,
      images: imageUrls,
      quantity
      // date: new Date().toString(),
    });
    await ad.save();
    res.send(ad);
  }
);

module.exports = router;
