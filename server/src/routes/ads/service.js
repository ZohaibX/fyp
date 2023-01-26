const CreateAd = require('./create-ad');
const GetAllAds = require('./get-all-ads');
const GetUserAds = require('./my-ads');
const GetAd = require('./get-ad');
const UpdateAd = require('./update-ad');
const DeleteAd = require('./delete-ad');

module.exports = (app) => {
  app.use(CreateAd);
  app.use(GetAllAds);
  app.use(GetUserAds);
  app.use(GetAd);
  app.use(UpdateAd);
  app.use(DeleteAd);
};
