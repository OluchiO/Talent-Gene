angular.module("typeOne", ["oitozero.ngSweetAlert", "ngRoute"])

.config(function($routeProvider) {
    $routeProvider

        .when('/landing', {
            templateUrl: 'views/landing.html',
            controller: 'landingCtrl'
        })
        .when('/instructions', {
            templateUrl: 'views/instructions.html',
            controller: 'landingCtrl'
        })
        .when('/demo', {
            templateUrl: 'views/demo.html',
            controller: 'demoCtrl',
            resolve: {
                email: function(serviceOne) {
                    return serviceOne.getEmail();
                }
            }
        })
        .when('/results', {
            templateUrl: 'views/results.html',
            controller: 'resultCtrl',
            resolve: {
                token: function(serviceOne) {
                    return serviceOne.getTokenObject();
                }
            }
        })
        .otherwise({
            redirectTo: '/landing'
        })

});









