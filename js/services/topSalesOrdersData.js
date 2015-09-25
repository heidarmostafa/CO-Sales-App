var homeController = angular.module('homeController');

homeController.service('TopSalesOrdersData', ['$http', '$q','Configuration', function ($http, $q,Configuration) {
        //service to get top sales orders data from back-end
        var q = $q.defer();
        var getData = function () {
            $http({
                url: Configuration.host+"/topsalesorders",
                method: "GET",
                params: {
                    sessionid: window.sessionStorage.getItem("sessionId")
                }
            })
                    .success(function (data, status, headers, config) {
                        if (data.resultDescription === "SUCCESS") {
                            //resolve data
                            q.resolve(data.data);
                        } else {
                            q.resolve('error');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log("error occurred while getting top sales orders:");
                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);
                    });
        };
        return {promise: q.promise, getData: getData};
    }]);