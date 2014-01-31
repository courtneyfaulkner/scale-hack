'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeasurementSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    date: {type: Date},
    weight: {type: Number}
});
MeasurementSchema.index({user:1,date:1}, {unique:true});

MeasurementSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Measurement', MeasurementSchema);
