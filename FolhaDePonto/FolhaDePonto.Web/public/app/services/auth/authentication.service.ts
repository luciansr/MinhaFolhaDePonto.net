module FolhaDePonto {
    export interface IUserInfo {
        accessToken: string;
        Nome: string;
        Role: string;
        ID: string;
    }

    export module Services {
        export class AuthenticationService extends FolhaDePonto.Base.Service {

            private userInfo: IUserInfo;
            private $window: ng.IWindowService;
            public static $inject = ['$http', '$q', '$window'];

            public constructor($http, $q, $window) {
                super($http, $q, 'Authentication');
                this.$window = $window;

                if ($window.localStorage["userInfo"]) {
                    this.userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                }
            }

            public GetCurrentUsername() {
                return super.Get('GetCurrentUsername');
            }

            public logout() {
                var self = this;
                var deferred = self.$q.defer();

                self.$window.localStorage["userInfo"] = null;
                self.userInfo = null;

                deferred.resolve(true);

                return deferred.promise;
            }

            public getUserInfo(): IUserInfo {
                return this.userInfo;
            }
        }
    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('authenticationService', FolhaDePonto.Services.AuthenticationService);

})();