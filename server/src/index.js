// import { database } from './services/mongodb';
const { app } = require('./app');
require('dotenv').config(); //? to use dotenv file

if (!process.env.JWTKEY)
    // this is in k8s/auth depl
    throw new Error('process.env.JWT_KEY is not defined ');

app.listen(process.env.HOST, () => {
    console.log(`App is listening on the port ${process.env.HOST}!!!`);
});
