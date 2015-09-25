var homeController = angular.module('homeController', []);

homeController.controller('homeController', ['$scope', '$location', 'SalesmanData', 'LastYearData', 'TopSalesOrdersData', 'TopSalesmenData', function ($scope, $location, SalesmanData, LastYearData, TopSalesOrdersData, TopSalesmenData) {
        $scope.loadingSalesmanChart = true;
        $scope.loadingTopSalesOrdersChart = true;
        $scope.loadingTopSalesmanChart = true;
        $scope.loadingLastYearChart = false;

        if (window.sessionStorage.getItem("sessionId") !== null) {
            //total sales for each salesman pie chart
            SalesmanData.getData();
            SalesmanData.promise.then(function (SalesmanData) {
                if (SalesmanData !== 'error') {
                    $scope.loadingSalesmanChart = false;
                    $scope.salesmanDataChart = SalesmanData.salesmanDataChart;
                    $scope.salesmanDataChartOptions = SalesmanData.salesmanDataChartOptions;
                } else {
                    $scope.$parent.clearUser();
                }
            });

            //total sales per month for last year bar chart
            LastYearData.getData();
            LastYearData.promise.then(function (LastYearData) {
                if (SalesmanData !== 'error') {
                    $scope.loadingLastYearChart = false;
                    $scope.lastYearDataChart = LastYearData.lastYearDataChart;
                    $scope.lastYearDataChartOptions = LastYearData.lastYearDataChartOptions;
                } else {
                    $scope.$parent.clearUser();
                }
            });

            //top 5 sales order table
            TopSalesOrdersData.getData();
            TopSalesOrdersData.promise.then(function (TopSalesOrdersData) {
                if (SalesmanData !== 'error') {
                    $scope.loadingTopSalesOrdersChart = false;
                    $scope.topSalesOrdersData = TopSalesOrdersData;
                } else {
                    $scope.$parent.clearUser();
                }
            });

            //top 5 salesmen list
            TopSalesmenData.getData();
            TopSalesmenData.promise.then(function (TopSalesmenData) {
                if (SalesmanData !== 'error') {
                    $scope.loadingTopSalesmanChart = false;
                    $scope.topSalesmanDataChart = TopSalesmenData.topSalesmanDataChart;
                    $scope.topSalesmanDataChartOptions = TopSalesmenData.topSalesmanDataChartOptions;
                } else {
                    $scope.$parent.clearUser();
                }
            });

            //reload charts functionality
            $scope.reloadSalesmanData = function () {
                $scope.loadingSalesmanChart = true;
                SalesmanData.getData();
                SalesmanData.promise.then(function () {
                    $scope.loadingSalesmanChart = false;
                });
            };
            $scope.reloadTopSalesOrdersData = function () {
                $scope.loadingTopSalesOrdersChart = true;
                TopSalesOrdersData.getData();
                TopSalesOrdersData.promise.then(function () {
                    $scope.loadingTopSalesOrdersChart = false;
                });
            };
            $scope.reloadTopSalesmenData = function () {
                $scope.loadingTopSalesmanChart = true;
                TopSalesmenData.getData();
                TopSalesmenData.promise.then(function () {
                    $scope.loadingTopSalesmanChart = false;
                });
            };
            $scope.reloadLastYearData = function () {
                $scope.loadingLastYearChart = true;
                LastYearData.getData();
                LastYearData.promise.then(function () {
                    $scope.loadingLastYearChart = false;
                });
            };

            //close chart functionality
            $scope.closeLastYearChart = function () {
                $scope.$parent.showLastYearData = false;
            };
            $scope.closeSalesmanChart = function () {
                $scope.$parent.showSalesmanData = false;
            };
            $scope.closetopSalesOrdersChart = function () {
                $scope.$parent.showTopSalesOrdersData = false;
            };
            $scope.closetopSalesmanChart = function () {
                $scope.$parent.showTopSalesmenData = false;
            };
        } else {
            $location.path("/login");
        }
    }])
        .directive('ngCharts', function () {
            //directive to initialize the grid stack plugin
            return {
                restrict: 'A',
                scope: true,
                controller: function ($scope) {
                    var options = {
                        cell_height: 80,
                        vertical_margin: 30,
                        min_width: 0,
                        always_show_resize_handle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        resizable: {
                            handles: 'e, se, s, sw, w'
                        }
                    };
                    $('.grid-stack').gridstack(options);

                    //resizing charts functionality
                    $('.grid-stack').on('resizestart', function (event, ui) {
                        var grid = this;
                        var element = event.target;
                        $(element).find(".highcharts-container").addClass("fix-width");
                    });
                    $('.grid-stack').on('resizestop', function (event, ui) {
                        var grid = this;
                        var element = event.target;
                        $(element).find(".reload-btn").trigger("click");
                    });
                }
            };
        });



        