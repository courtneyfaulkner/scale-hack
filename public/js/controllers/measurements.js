'use strict';

angular.module('mean.measurements').controller('MeasurementsController', ['$scope', '$routeParams', '$location', 'Global', 'Measurements', 
    function ($scope, $routeParams, $location, Global, Measurements) {
        $scope.global = Global;
        $scope.newMeasurement = new Measurements()
        $scope.create = function() {
            console.log("" + $scope.newMeasurement.date);
            console.log("" + $scope.newMeasurement.weight);
            if ($scope.newMeasurement.date && $scope.newMeasurement.weight) {
                
                $scope.newMeasurement.$save(function(response) {
                    // $location.path('measurements/' + response._id);
                    $scope.find();
                    // console.log(response);
                    // $scope.measurements.unshift($scope.newMeasurement);
                    $scope.newMeasurement = new Measurements();
                });

                
            }
        };

        $scope.remove = function(measurement) {
            if (measurement) {
                measurement.$remove();

                for (var i in $scope.measurements) {
                    if ($scope.measurements[i] === measurement) {
                        $scope.measurements.splice(i, 1);
                    }
                }
            }
            else {
                $scope.measurement.$remove();
                $location.path('measurements');
            }
        };

        $scope.update = function(measurement) {
            
            measurement.$update(function(m) {
                if (m.replaced) {
                    $scope.find();
                }
            });
        
        };

        $scope.find = function() {
            Measurements.query(function(measurements) {
                $scope.measurements = measurements;
            });
        };

        $scope.findOne = function() {
            Measurements.get({
                measurementId: $routeParams.measurementId
            }, function(measurement) {
                $scope.measurement = measurement;
            });
        };
}]);