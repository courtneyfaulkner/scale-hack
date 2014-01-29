'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.profile').factory('Profile', ['$resource', function($resource) {
    return $resource('users/me', {
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);