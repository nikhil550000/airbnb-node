require('ts-node/register');//This line enables typescript support
const config = require('./db.config');

module.exports = config.default || config;