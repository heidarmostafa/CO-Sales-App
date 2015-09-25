var loginController = angular.module('loginController', []);

loginController.controller('loginController', ['$scope', '$http', '$location','Configuration', function ($scope, $http, $location,Configuration) {
        if (window.sessionStorage.getItem("sessionId") === null) {
            $scope.username = '';
            $scope.password = '';
            $scope.loginLoading = false;
            
            //login functionality
            $scope.login = function () {
                if ($scope.username !== '' && $scope.password !== '') {
                    $scope.loginLoading = true;
                    $http({
                        url: Configuration.host+"/login",
                        method: "GET",
                        params: {
                            username: $scope.username,
                            password: $scope.password
                        }
                    })
                            .success(function (data, status, headers, config) {
                                $scope.loginLoading = false;
                                if (data.loginSucceeded) {
                                    //storing session id and user name to session storage for accessibility
                                    window.sessionStorage.setItem("sessionId", data.sessionId);
                                    window.sessionStorage.setItem("username", $scope.username);
                                    $scope.$parent.showHeader = true;
                                    $location.path("/home");
                                } else {
                                    $scope.loginErrorMessage = 'Incorrect User Name or Password.';
                                    $("#login-error").slideDown(300);
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log("error occurred while logging in:");
                                console.log(data);
                                console.log(status);
                                console.log(headers);
                                console.log(config);
                            });
                } else {
                    $scope.loginErrorMessage = 'Please fill the required fields (User Name, Password)';
                    $("#login-error").slideDown(300);
                }
            };
        } else {
            $location.path("/home");
        }
    }]);