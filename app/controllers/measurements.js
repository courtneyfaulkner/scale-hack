'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Measurement = mongoose.model('Measurement'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.measurement = function(req, res, next, id) {
    Measurement.load(id, function(err, measurement) {
        if (err) return next(err);
        if (!measurement) return next(new Error('Failed to load measurement ' + id));
        req.measurement = measurement;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var measurement = new Measurement(req.body);
    measurement.user = req.user;

    measurement.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                measurement: measurement
            });
        } else {
            res.jsonp(measurement);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var measurement = req.measurement;

    measurement = _.extend(measurement, req.body);

    measurement.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                measurement: measurement
            });
        } else {
            res.jsonp(measurement);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var measurement = req.measurement;

    measurement.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                measurement: measurement
            });
        } else {
            res.jsonp(measurement);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.measurement);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
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