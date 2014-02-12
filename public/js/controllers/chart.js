'use strict';

angular.module('mean.system').controller('ChartController', ['$scope', 'Global', 'Measurements', function ($scope, Global, Measurements) {
    $scope.global = Global;
    $scope.data = Measurements.query();
}]);