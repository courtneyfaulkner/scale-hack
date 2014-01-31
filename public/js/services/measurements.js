'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.measurements').factory('Measurements', ['$resource', function($resource) {
    return $resource('measurements/:measurementId', {
        measurementId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        create: {
            method: 'POST'
        }
    });
}]);