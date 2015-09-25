var homeController = angular.module('homeController');

homeController.service('SalesmanData', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        //service to get the sales men data from the back-end
        var q = $q.defer();
        var getData = function () {
            var salesmandata = new Array();
            var salesmanDataChartOptions;
            var salesmanDataChart;
            $http({
                url: Configuration.host + "/salesmandata",
                method: "GET",
                params: {
                    sessionid: window.sessionStorage.getItem("sessionId")
                }
            })
                    .success(function (data, status, headers, config) {
                        if (data.resultDescription === "SUCCESS") {
                            for (var i = 0; i < data.data.length; i++) {
                                salesmandata.push([data.data[i][0], Number(data.data[i][1])]);
                            }

                            //sales men chart options
                            salesmanDataChartOptions = {
                                chart: {
                                    renderTo: 'salesmanDataChart',
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false
                                },
                                title: {
                                    text: 'Total Sales For Each Sales Man'
                                },
                                subtitle: {
                                    text: 'total sales values for each sales man'
                                },
                                credits: {
                                    enabled: false
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        distance: -30,
                                        dataLabels: {
                                            enabled: true,
                                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                            style: {
                                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                            }
                                        }
                                    }
                                },
                                series: [{
                                        type: 'pie',
                                        name: 'Browser share',
                                        data: salesmandata
                                    }]
                            };

                            //initialize sales men chart
                            salesmanDataChart = new Highcharts.Chart(salesmanDataChartOptions);

                            //resolve chart reference and chart options
                            q.resolve({
                                salesmanDataChart: salesmanDataChart,
                                salesmanDataChartOptions: salesmanDataChartOptions
                            });

                        } else {
                            q.resolve('error');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log("error occurred while getting salesmen data:");
                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);
                    });
        };
        return {promise: q.promise, getData: getData};
    }]);