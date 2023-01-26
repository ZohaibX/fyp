const mongoose = require('mongoose');
require('dotenv').config(); // to use dotenv file

module.exports = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info('connected to local database');
  } catch (error) {
    console.error('error in database connection: ', error);
  }
};
