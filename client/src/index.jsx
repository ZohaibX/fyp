//? serving as a root file for the server

import 'babel-polyfill'; // to use async await
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/routes/routes';
import renderer from './helpers-for-server/renderer';
import proxy from 'express-http-proxy';
import CreateStore from './helpers-for-server/server-redux-store';
import path from 'path';
import { keys } from './config/keys';

const app = express();

app.use(
    '/api',
    // Replace
    proxy(`${keys.BACKEND}/api`, {
        proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = 'localhost:3000';
            return opts;
        }
    })
);
//  route like /api/users will come into server, from browser
// /api will be replaced with the backend route we provide -- something like https://backend/users
// 2nd option is specifically for this course, to pass the google authentication

app.use(express.static('public')); // very important line of code , to run js functionality

app.get('*', (req, res) => {
    const store = CreateStore(req);

    // some logic to initialize and load data into redux store
    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            return route.loadData ? route.loadData(store) : null;
        })
        .map((promise) => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve); // always render the page and not stuck if get some error from backend
                });
            }
        });
    // 2nd map statement is to catch errors, coming from backend -

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.url) return res.redirect(301, context.url);
        // whenever i will use Redirect from react-router-dom. that will set some path and url property to context
        // thats how we will implement redirection on server side too
        if (context.notFound) res.status(404); // this setting is for notFoundPage

        res.send(content);
    });
});

app.listen(keys.PORT, () => {
    console.log('Server Side of SSR running on port -- 3000');
});
