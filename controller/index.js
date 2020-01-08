const routes = require('express').Router();

const offensivewords = require('./offensivewords');
const posts = require('./posts');
const comments = require('./comments');
const users = require('./users');

routes.use('/offensivewords', offensivewords);
routes.use('/posts', posts);
routes.use('/posts/:id/comments',comments);
routes.use('/users',users);

module.exports = routes;