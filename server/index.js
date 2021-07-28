/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();

// Middleware
const { userAgent } = require('koa-useragent');
const passport = require('koa-passport');

const serve = require('koa-static');
const mount = require("koa-mount");

// Routes
const cake = require('../routes/cake');

// App Middleware
app.use(cors());
app.use(userAgent);
app.use(passport.initialize());
app.use(mount('/', serve('./public')));

// App Routes
app.use(cake.routes());


// Start the server
const server = require('http').createServer(app.callback())

const port = 3001;
server.listen(port, () => console.log(`Server has started. Listening on port ${port}`));