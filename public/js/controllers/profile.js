'use strict';

angular.module('mean.profile').controller('ProfileController', ['$scope', '$routeParams', '$window', 'Global', 'Profile', function ($scope, $routeParams,  $window, Global, Profile) {
    $scope.global = Global;

    $scope.update = function() {
        var profile = $scope.profile;
        profile.$update();
        $window.history.back();
    };

    $scope.load = function() {
        Profile.get({}, function(profile) {
            $scope.profile = profile;
        });
    };
}]);