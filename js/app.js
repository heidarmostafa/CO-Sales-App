var salesApp = angular.module('salesApp', [
    'ngRoute',
    'mainController',
    'loginController',
    'homeController'
])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.
                        when('/home', {
                            templateUrl: 'views/home.html',
                            controller: 'homeController'
                        }).
                        when('/login', {
                            templateUrl: 'views/login.html',
                            controller: 'loginController'
                        }).
                        otherwise({
                            redirectTo: '/login'
                        });
            }]);