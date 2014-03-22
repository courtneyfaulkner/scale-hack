'use strict';

var app = angular.module('mean.directives');


app.directive('date', function (dateFilter) {
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs.date || 'M/d/yyyy';
            var minDate = Date.parse(attrs.min) || 0;
            var maxDate = Date.parse(attrs.max) || 9007199254740992;

            ctrl.$parsers.unshift(function (viewValue) {
                var parsedDateMilissec = Date.parse(viewValue);
                if (parsedDateMilissec > 0) {
                    if (parsedDateMilissec >= minDate && parsedDateMilissec <= maxDate) {
                        ctrl.$setValidity('date', true);
                        return parsedDateMilissec;
                    }
                }

                // in all other cases it is invalid, return undefined (no model update)
                ctrl.$setValidity('date', false);
                return undefined;
            });

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
});

angular.module('mean.directives')
    .directive('weightChart', ['d3Service', function(d3Service) {
        return {
            restrict: 'A',
            
            link: function(scope, element, attrs) {
                d3Service.d3().then(function(d3) {
                    // var data = scope.val.asArray();

                    var margin = {top: 20, right: 20, bottom: 30, left: 40},
                        width = element.width() - margin.left - margin.right,
                        height = 500 - margin.top - margin.bottom;

                    var format = d3.time.format('%Y-%m-%d');

                    var x = d3.time.scale()
                        .range([0, width]);

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom');

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient('left');

                    var line = d3.svg.line()
                        .x(function(d) { return x(d.date); })
                        .y(function(d) { return y(d.weight); });

                    var svg = d3.select(element[0]).append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                    
                    svg.append('g').attr('class', 'x axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(xAxis);

                    svg.append('g')
                        .attr('class', 'y axis')
                        .call(yAxis)
                        .append('text')
                        .attr('transform', 'rotate(-90)')
                        .attr('y', 12)
                        .attr('dy', '.71em')
                        .style('text-anchor', 'end')
                        .text('weight');
                    var path = svg.append('path')
                        .attr('class', 'line');
                    scope.$watch(attrs.chartData, function(val) {
                        if (!val) return;
                        var data = [];
                        angular.forEach(val.asArray(),function(d) {
                            var datum = {};
                            //datum.date = format(new Date(d.date));
                            datum.date = new Date(d.date);
                            datum.weight = d.weight;
                            data.push(datum);
                        });
                        x.domain(d3.extent(data, function(d) { return d.date; }));
                        y.domain(d3.extent(data, function(d) { return d.weight; }));
                        path.datum(data).attr('d',line);
                    });
                });
                


            }
        };
    }]);
