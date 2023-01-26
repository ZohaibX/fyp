// go to sendgrid, to account
// settings tab -> sender authentication -> verify a single sender -> create sender ->
// from and reply section can be same -> after creating -> verify from email address
// then on settings tab -> api keys -> create a key -- copy that

const sgmail = require('@sendgrid/mail');
const { BadRequestException } = require('@zbtickets/common');
require('dotenv').config(); // to use dotenv file

module.exports.sendMail = (to, subject, text) => {
    if (!process.env.SENDGRID)
        throw new BadRequestException('Error Coming from Mail Sending API-Key');
    sgmail.setApiKey(process.env.SENDGRID);

    const msg = {
        to,
        from: 'Zohaib.Butt.X@gmail.com', // email name will be displayed as zohaibbutt045, so it should be a better email
        subject,
        html: text
    };

    sgmail.send(msg);
};
