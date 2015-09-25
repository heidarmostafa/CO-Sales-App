var homeController = angular.module('homeController');

homeController.service('TopSalesmenData', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        //service to get top sales men data from back-end
        var q = $q.defer();
        var getData = function () {
            var topsalesmannames = new Array();
            var topsalesmandata = new Array();
            var topSalesmanDataChartOptions;
            var topSalesmanDataChart;
            $http({
                url: Configuration.host + "/topsalesmen",
                method: "GET",
                params: {
                    sessionid: window.sessionStorage.getItem("sessionId")
                }
            })
                    .success(function (data, status, headers, config) {
                        if (data.resultDescription === "SUCCESS") {
                            for (var i = 0; i < data.data.length; i++) {
                                topsalesmannames.push(data.data[i][0]);
                                topsalesmandata.push(Number(data.data[i][1]));
                            }

                            //top sales men data chart options
                            topSalesmanDataChartOptions = {
                                chart: {
                                    renderTo: 'topSalesmanDataChart',
                                    type: 'bar'
                                },
                                title: {
                                    text: 'Top 5 Sales Men'
                                },
                                subtitle: {
                                    text: 'list for top 5 sales men in last 3 months'
                                },
                                credits: {
                                    enabled: false
                                },
                                xAxis: {
                                    categories: topsalesmannames,
                                    title: {
                                        text: null
                                    }
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Sales',
                                        align: 'high'
                                    },
                                    labels: {
                                        overflow: 'justify'
                                    }
                                },
                                plotOptions: {
                                    bar: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                series: [{
                                        showInLegend: false,
                                        name: 'sales',
                                        data: topsalesmandata
                                    }]
                            };

                            //initialize top sales men data chart
                            topSalesmanDataChart = new Highcharts.Chart(topSalesmanDataChartOptions);

                            //resolve chart reference and chart options
                            q.resolve({
                                topSalesmanDataChart: topSalesmanDataChart,
                                topSalesmanDataChartOptions: topSalesmanDataChartOptions
                            });
                        } else {
                            q.resolve('error');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log("error occurred while getting top salesmen data:");
                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);
                    });
        };
        return {promise: q.promise, getData: getData};
    }]);