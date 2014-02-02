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
    process.nextTick(function() {
        Measurement.load(id, function(err, measurement) {
            if (err) return next(err);
            if (!measurement) return next(new Error('Failed to load measurement ' + id));
            req.measurement = measurement;
            next();
        });
    });
};

var findByKey = function(key, callback) {
    process.nextTick(function() {
        Measurement.findOne({user: key.user, date: key.date}, function(err, measurement) {
            callback(err, measurement);
        });
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    process.nextTick(function() {
        var save = function() {
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
        var measurement = new Measurement(req.body);
        measurement.user = req.user;
        findByKey(measurement, function(err, found) {
            if (found) {
                found.remove();
            }
            save();

        });
        
    });
};

var update = function(req, res) {
    process.nextTick(function() {
        var save = function(replaced) {
            measurement.save(function(err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors,
                        measurement: measurement
                    });
                } else {
                    console.log('Measurement replaced = ' + replaced);
                    res.jsonp(_.extend({replaced:replaced}, req.body));
                }
            });
        };
        var measurement = req.measurement;
        measurement = _.extend(measurement, req.body);
        findByKey(measurement, function(err, found) {
            if (found && found.id !== measurement.id) {
                process.nextTick(function() {
                    found.remove();
                    process.nextTick(function() { save(true); });
                });
            } else {
                process.nextTick(function() { save(false); });
            }
        });

    });
};
/**
 * Update a article
 */
exports.update = update;


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