'use strict';

// Articles routes use articles controller
var measurements = require('../controllers/measurements');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.measurement.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/measurements', authorization.requiresLogin, measurements.all);
    app.post('/measurements', authorization.requiresLogin, measurements.create);
    //app.get('/articles/:articleId', articles.show);
    app.put('/measurements/:measurementId', authorization.requiresLogin, hasAuthorization, measurements.update);
    app.del('/measurements/:measurementId', authorization.requiresLogin, hasAuthorization, measurements.destroy);

    // Finish with setting up the articleId param
    app.param('measurementId', measurements.measurement);

};