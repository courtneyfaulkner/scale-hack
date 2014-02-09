'use strict';

RBTree.prototype.asArray = function() {
    var iterator = this.iterator();
    var item;
    var result = [];
    while ((item = iterator.next()) !== null) {
        result.push(item);
    }
    return result;
};

angular.module('mean.measurements').controller('MeasurementsController', ['$scope', '$routeParams', '$location', 'Global', 'Measurements',
    function ($scope, $routeParams, $location, Global, Measurements) {
        $scope.global = Global;
        $scope.newMeasurement = new Measurements();
        
        $scope.create = function(measurement, replacedMeasurement) {
            measurement.$save(function(measurement) {
                if (replacedMeasurement) $scope.measurements.remove(replacedMeasurement);
                $scope.measurements.insert(measurement);
                $scope.newMeasurement = new Measurements();
            });
        };

        $scope.remove = function(measurement) {
            measurement.$remove();
            $scope.measurements.remove(measurement);
        };

        $scope.update = function(newMeasurement, originalMeasurement, replacedMeasurement) {
            newMeasurement.$update(function() {
                if (replacedMeasurement) {
                    $scope.measurements.remove(replacedMeasurement);
                } else if (originalMeasurement && originalMeasurement.date !== newMeasurement.date) {
                    $scope.measurements.remove(originalMeasurement);
                    $scope.measurements.insert(newMeasurement);
                }
            });
        };

        $scope.find = function() {
            Measurements.query(function(measurements) {
                $scope.measurements = new RBTree(function(a,b) {
                    var d1 = a.date;
                    var d2 = b.date;
                    if (typeof d1 !== 'object') d1 = new Date(d1);
                    if (typeof d2 !== 'object') d2 = new Date(d2);
                    return d2.getTime() - d1.getTime();
                });
                for (var i = 0;i < measurements.length; i++) {
                    $scope.measurements.insert(measurements[i]);
                }
            });
        };

        $scope.findOne = function() {
            Measurements.get({
                measurementId: $routeParams.measurementId
            }, function(measurement) {
                $scope.measurement = measurement;
            });
        };
    }]).controller('MeasurementController', ['$scope', 'Measurements', function($scope, Measurements) {
        $scope.measurement = new Measurements();
        var duplicateCheck = function(overwrite, callback) {
            var replacedMeasurement = $scope.measurements.find($scope.measurement);
            if (replacedMeasurement && !overwrite) {
                $scope.duplicate = true;
            } else {
                $scope.duplicate = false;
                callback(replacedMeasurement);
            }
        };
        $scope.create = function(overwrite) {
            if (!$scope.measurement.date || !$scope.measurement.weight) {
                return;
            }
            duplicateCheck(overwrite,function(replacedMeasurement) {
                $scope.$parent.create($scope.measurement,replacedMeasurement);
                $scope.measurement = new Measurements();
            });
        };
        $scope.update = function(overwrite) {
            if ($scope.form.$pristine || !$scope.measurement.date || !$scope.measurement.weight) {
                return;
            } else if ($scope.measurement.date !== $scope.originalMeasurement.date) {
                duplicateCheck(overwrite, function(replacedMeasurement) {
                    $scope.$parent.update( $scope.measurement, $scope.originalMeasurement, replacedMeasurement);
                });
            } else if ($scope.measurement.date === $scope.originalMeasurement.date) {
                $scope.$parent.update($scope.measurement);
            }
        };
        $scope.remove = function() {
            $scope.$parent.remove($scope.measurement);
        };
        $scope.cancel = function() {
            $scope.init($scope.originalMeasurement);
            $scope.duplicate = false;
        };
        $scope.init = function(measurement) {
            if (measurement) {
                $scope.measurement.date = measurement.date;
                $scope.measurement.weight = measurement.weight;
                $scope.measurement._id = measurement._id;
                $scope.originalMeasurement = measurement;
            } else {
                $scope.measurement = new Measurements();
            }
        };
    }]);