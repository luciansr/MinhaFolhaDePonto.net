var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FolhaDePonto;
(function (FolhaDePonto) {
    var Services;
    (function (Services) {
        /**
        authenticationService
        */
        var AuthenticationService = (function (_super) {
            __extends(AuthenticationService, _super);
            function AuthenticationService($http, $q, $window, $rootScope, $location) {
                _super.call(this, $http, $q, 'Authentication');
                this.$window = $window;
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.$window.localStorage["userInfo"] = null;
                //this.$rootScope.Usuario = {};
                //if ($window.localStorage["userInfo"]) {
                //    //this.setUserInfo($window.localStorage["userInfo"]);
                //    this.userInfo = JSON.parse($window.localStorage["userInfo"]);
                //    this.$rootScope.Usuario = this.userInfo;
                //}
            }
            AuthenticationService.prototype.UserHasAccess = function (allowedRoles) {
                if (this.getUserInfo() != null)
                    return true;
                return false;
            };
            AuthenticationService.prototype.setUserInfo = function (user) {
                this.userInfo = user;
            };
            AuthenticationService.prototype.getUserInfo = function () {
                return this.userInfo;
            };
            AuthenticationService.prototype.GetCurrentUsername = function () {
                return _super.prototype.Get.call(this, 'GetCurrentUsername');
            };
            AuthenticationService.prototype.logout = function () {
                var self = this;
                var deferred = self.$q.defer();
                self.$window.localStorage["userInfo"] = null;
                self.userInfo = null;
                self.$rootScope.Usuario = null;
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                    deferred.resolve(true);
                    self.$rootScope.$evalAsync(function () {
                        self.$location.path('/Login');
                    });
                });
                return deferred.promise;
            };
            AuthenticationService.prototype.googleLogin = function (token) {
                var self = this;
                var deferred = self.$q.defer();
                var objData = "grant_type=password&username=&password=" + token;
                self.$http.post('/GetToken', objData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (data) {
                    if (data.access_token !== undefined && data.access_token != null) {
                        self.userInfo = {
                            accessToken: data.access_token,
                            Nome: data.Nome,
                            Role: data.Role,
                            ID: data.ID
                        };
                        self.$window.localStorage["userInfo"] = JSON.stringify(self.userInfo);
                        self.$rootScope.Usuario = self.userInfo;
                        deferred.resolve(true);
                        self.$location.path('/Home');
                    }
                    else {
                        deferred.resolve(false);
                    }
                }).error(function (err, status) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            AuthenticationService.$inject = ['$http', '$q', '$window', '$rootScope', '$location'];
            return AuthenticationService;
        })(FolhaDePonto.Base.Service);
        Services.AuthenticationService = AuthenticationService;
    })(Services = FolhaDePonto.Services || (FolhaDePonto.Services = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('authenticationService', FolhaDePonto.Services.AuthenticationService);
})();
//# sourceMappingURL=authentication.service.js.map