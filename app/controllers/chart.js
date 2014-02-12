'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Measurement = mongoose.model('Measurement');


exports.render = function(req, res) {
    Measurement.find({user: req.user}).sort('-date').exec(function(err, measurements) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(measurements);
        }
    });
};