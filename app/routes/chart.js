'use strict';

// Articles routes use articles controller
var chart = require('../controllers/chart');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {
    app.get('/chart', authorization.requiresLogin, chart.render);
};
