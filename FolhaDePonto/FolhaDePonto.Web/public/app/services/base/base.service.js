var FolhaDePonto;
(function (FolhaDePonto) {
    var Base;
    (function (Base) {
        var Service = (function () {
            function Service($http, $q, controllerName) {
                this.$http = $http;
                this.$q = $q;
                this.baseServiceUrl = '/api/' + controllerName;
            }
            Service.prototype.GetCleanStringParameters = function (stringParameters) {
                if (stringParameters && stringParameters.length > 0) {
                    return stringParameters;
                }
                return '';
            };
            Service.prototype.GetUrl = function (actionUrl, stringParameters) {
                return this.baseServiceUrl + '/' + actionUrl + this.GetCleanStringParameters(stringParameters);
            };
            Service.prototype.Get = function (actionUrl, stringParameters) {
                var defer = this.$q.defer();
                var url = this.GetUrl(actionUrl, stringParameters);
                this.$http.get(url).then(function (data) {
                    defer.resolve(data.data);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            Service.prototype.Post = function (actionUrl, data) {
                var defer = this.$q.defer();
                var url = this.GetUrl(actionUrl);
                this.$http.post(url, data).then(function (data) {
                    defer.resolve(data.data);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            return Service;
        })();
        Base.Service = Service;
    })(Base = FolhaDePonto.Base || (FolhaDePonto.Base = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
