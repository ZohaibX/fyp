const { NotAuthorizedError } = require('@zbtickets/common');
const express = require('express');
const currentUser = require('../../../middlewares/current-user');

const router = express.Router();

router.post('/api/users/image-upload', currentUser, async (req, res) => {
  if (!req.currentUser && !req.user)
    throw new NotAuthorizedError('Not Authorized');

  const { imageUrl } = req.body;

  // find data through email using req.currentUser or req.user
  // note - imageUrl is not actual url but key -- url contains the key in itself
  // I could save this imageUrl here and i could save its data too -- all in mongo

  res.send(`ImageUrl is: ${imageUrl} `);
});

module.exports.ImageUpload = router;
