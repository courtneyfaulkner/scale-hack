'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/measurements', {
            templateUrl: 'views/measurements/list.html'
        }).
        // when('/measurements/create', {
        //     templateUrl: 'views/measurements/create.html'
        // }).
        // when('/measurements/:measurementId/edit', {
        //     templateUrl: 'views/measurements/edit.html'
        // }).
        // when('/measurements/:measurementId', {
        //     templateUrl: 'views/measurements/view.html'
        // }).
        when('/chart', {
            templateUrl: 'views/chart/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/profile', {
            templateUrl: '/views/profile.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);