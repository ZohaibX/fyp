// this route will return a presigned url to the client
const express = require('express');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const currentUser = require('../../../middlewares/current-user');
const { NotAuthorizedError } = require('@zbtickets/common');
require('dotenv').config();

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_PUBLIC,
  secretAccessKey: process.env.AWS_PRIVATE,
});

const router = express.Router();

// this method is returning a url, configured with the Key, we shared
router.get(
  '/api/users/image-upload/get-url',
  // Replace
  currentUser,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('U r not authorized');
    // we want our key to be like this -- myUserId/12122113.jpeg -- where filename will be used as a random unique string
    let id;
    if (req.currentUser) id = req.currentUser.id;
    else if (req.user) id = req.user._id;

    const key = `${id}/${uuid()}.jpeg`;
    // this key will be the name of the file, we will upload to s3
    // so we could save the url and this filename, into our database
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'trade-the-bird-x',
        ContentType: 'image/jpeg',
        Key: key,
      },
      (err, url) => res.send({ key, url, err })
    );
  }
);

module.exports.GetPresignedUrl = router;
