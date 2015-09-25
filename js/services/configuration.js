var homeController = angular.module('homeController');

homeController.service('Configuration', function () {
    //configuration service to share any configuration variables between services 
    return {
        host: 'http://localhost:8080'
    };
});