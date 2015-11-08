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
                    this.userInfo = JSON.parse($window.localStorage["userInfo"]);
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

                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                    deferred.resolve(true);
                });

                return deferred.promise;
            }

            public googleLogin(token) {
                var self = this;
                var deferred = self.$q.defer();

                var objData = "grant_type=password&username=&password=" + token;

                self.$http.post('/GetToken',
                    objData,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                ).success(function (data: any) {
                    if (data.access_token !== undefined && data.access_token != null) {

                        self.userInfo = {
                            accessToken: data.access_token,
                            Nome: data.Nome,
                            Role: data.Role,
                            ID: data.ID
                        };

                        self.$window.sessionStorage["userInfo"] = JSON.stringify(self.userInfo);
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                }).error(function (err, status) {
                    deferred.reject(err);
                });

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