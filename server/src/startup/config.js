require('dotenv').config(); // to use dotenv file

module.exports = function () {
  if (!process.env.JWTKEY) {
    console.error('FATAL Error : jwt is not defined');
    process.exit(1);
  }
};
