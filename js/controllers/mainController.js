var mainController = angular.module('mainController', []);

mainController.controller('mainController', ['$scope', '$http', '$location', 'Configuration', function ($scope, $http, $location, Configuration) {
        $scope.showHeader = false;
        $scope.showSalesmanData = true;
        $scope.showTopSalesOrdersData = true;
        $scope.showTopSalesmenData = true;
        $scope.showLastYearData = true;

        //clear user functionality
        $scope.clearUser = function () {
            window.sessionStorage.removeItem("sessionId");
            window.sessionStorage.removeItem("username");
            $location.path("/login");
        };

        //logout functionality
        function mycallback(data)
        {
            console.log(data);
        }
        $scope.logout = function () {
            $http({
                url: Configuration.host + "/logout",
                method: "GET",
                transformResponse: [function (data) {
                        return {response: data};
                    }],
                params: {
                    sessionid: window.sessionStorage.getItem("sessionId")
                }
            })
                    .success(function (data) {
                        if (data.response === "SUCCESS") {
                            window.sessionStorage.removeItem("sessionId");
                            window.sessionStorage.removeItem("username");
                            $location.path("/login");
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log("error occurred while logging out:");
                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);
                    });
        }

        //make header disappear on login screem
        $scope.$on('$routeChangeSuccess', function (next, current) {
            if (current.loadedTemplateUrl === 'views/home.html') {
                $scope.showHeader = true;
                $scope.username = window.sessionStorage.getItem("username");
            } else {
                $scope.showHeader = false;
            }
        });

        //privacy policy popup data
        $scope.privacyPolicyData = function () {
            $scope.footerData = {
                title: "Privacy Policy",
                data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            };
        };

        //terms popup data
        $scope.termsData = function () {
            $scope.footerData = {
                title: "Terms of Use",
                data: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            };
        };

        //send message functionality
        $scope.sendMessage = function () {
            $("#message-notification").slideDown(300, function () {
                setTimeout(function () {
                    $('#supportForm').modal('hide');
                    $("#message-notification").slideUp(0);
                }, 1000);
            });
        };
    }]);