module FolhaDePonto.Services {
    export class HttpInterceptorService {
        private $q: ng.IQService;
        private $window: ng.IWindowService;
        private $location: ng.ILocationService;

        public request;
        public responseError;
        public response;

        private toastrService: FolhaDePonto.Log.ToastrService;
        private ngProgressService: FolhaDePonto.ProgressBar.NGProgressService;

        private numChamadas: number;

        public static $inject = ['$q', '$window', '$location', 'toastrService', 'ngProgressService'];

        constructor($q, $window, $location, toastrService, ngProgressService) {
            this.$q = $q;
            this.toastrService = toastrService;
            this.ngProgressService = ngProgressService;
            this.numChamadas = 0;
            this.$window = $window;
            this.$location = $location;

            this.request = (config) => {
                var self = this;
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

            this.response = (data) => {
                var self = this;

                //self.toastrService.Success('Sucesso');
                if (--self.numChamadas == 0) {
                    self.ngProgressService.Done();
                }

                return self.$q.resolve(data);
            };

            this.responseError = (rejection) => {
                var self = this;

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
    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('httpInterceptorService', FolhaDePonto.Services.HttpInterceptorService);

})();