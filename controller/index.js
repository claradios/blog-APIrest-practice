const routes = require('express').Router();
const offensivewords = require('./offensivewords');
const posts = require('./posts');

routes.use('/offensivewords', offensivewords);
routes.use('/posts', posts);

module.exports = routes;