var FolhaDePonto;
(function (FolhaDePonto) {
    var Services;
    (function (Services) {
        var HttpInterceptorService = (function () {
            function HttpInterceptorService($q, $window, $location, toastrService, ngProgressService) {
                var _this = this;
                this.$q = $q;
                this.toastrService = toastrService;
                this.ngProgressService = ngProgressService;
                this.numChamadas = 0;
                this.$window = $window;
                this.$location = $location;
                this.request = function (config) {
                    var self = _this;
                    //self.toastrService.Info('Início');
                    self.ngProgressService.Start();
                    ++self.numChamadas;
                    config.headers = config.headers || {};
                    if (self.$window.localStorage["userInfo"] != null) {
                        var userInfo = JSON.parse(self.$window.localStorage["userInfo"]);
                        if (userInfo != null) {
                            var token = userInfo.accessToken;
                        }
                    }
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                };
                this.response = function (data) {
                    var self = _this;
                    //self.toastrService.Success('Sucesso');
                    if (--self.numChamadas == 0) {
                        self.ngProgressService.Done();
                    }
                    return self.$q.resolve(data);
                };
                this.responseError = function (rejection) {
                    var self = _this;
                    if (--self.numChamadas == 0) {
                        self.ngProgressService.Done();
                    }
                    if (rejection.status === 401) {
                        self.toastrService.Error('Acesso não autorizado.');
                        self.$location.path('/Login');
                    }
                    return self.$q.reject(rejection);
                };
            }
            HttpInterceptorService.$inject = ['$q', '$window', '$location', 'toastrService', 'ngProgressService'];
            return HttpInterceptorService;
        })();
        Services.HttpInterceptorService = HttpInterceptorService;
    })(Services = FolhaDePonto.Services || (FolhaDePonto.Services = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('httpInterceptorService', FolhaDePonto.Services.HttpInterceptorService);
})();
