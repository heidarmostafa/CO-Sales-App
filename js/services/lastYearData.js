var homeController = angular.module('homeController');
homeController.service('LastYearData', ['$http', '$q', '$rootScope', 'Configuration', function ($http, $q, $rootScope, Configuration) {
        //service to get the last year data from the back-end
        var q = $q.defer();
        var getData = function () {
            var lastyeardata = new Array();
            var lastYearDataChartOptions;
            var lastYearDataChart;
            $http({
                url: Configuration.host + "/lastyeardata",
                method: "GET",
                params: {
                    sessionid: window.sessionStorage.getItem("sessionId")
                }
            })
                    .success(function (data, status, headers, config) {
                        if (data.resultDescription === "SUCCESS") {
                            for (var i = 0; i < data.data.length; i++) {
                                lastyeardata.push(Number(data.data[i][1]));
                            }
                            //set chart options
                            lastYearDataChartOptions = {
                                chart: {
                                    renderTo: 'lastYearDataChart',
                                    type: 'column'
                                },
                                title: {
                                    text: 'Total Sales Per Month'
                                },
                                subtitle: {
                                    text: 'bar chart for total sales per month'
                                },
                                credits: {
                                    enabled: false
                                },
                                xAxis: {
                                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                                    crosshair: true
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Sales Number'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    column: {
                                        pointPadding: 0.2,
                                        borderWidth: 0
                                    }
                                },
                                series: [{
                                        showInLegend: false,
                                        name: 'sales',
                                        data: lastyeardata

                                    }]
                            };

                            //initialize chart
                            lastYearDataChart = new Highcharts.Chart(lastYearDataChartOptions);

                            //resolve chart reference and chart options
                            q.resolve({
                                lastYearDataChart: lastYearDataChart,
                                lastYearDataChartOptions: lastYearDataChartOptions
                            });

                        } else {
                            q.resolve('error');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log("error occurred while getting last year data:");
                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);
                    });
        }
        return {promise: q.promise, getData: getData};
    }]);