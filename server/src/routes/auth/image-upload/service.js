const { GetPresignedUrl } = require('./get-url');
const { ImageUpload } = require('./upload');

module.exports.ImageUploads = (app) => {
  app.use(ImageUpload);
  app.use(GetPresignedUrl);
};
