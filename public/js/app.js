'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 
    'mean.system', 'mean.articles', 'mean.profile', 'mean.measurements', 'mean.directives']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.profile', []);
angular.module('mean.measurements', []);
angular.module('mean.directives', []);