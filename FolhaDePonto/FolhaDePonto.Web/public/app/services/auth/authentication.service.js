var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FolhaDePonto;
(function (FolhaDePonto) {
    var Services;
    (function (Services) {
        var AuthenticationService = (function (_super) {
            __extends(AuthenticationService, _super);
            function AuthenticationService($http, $q, $window) {
                _super.call(this, $http, $q, 'Authentication');
                this.$window = $window;
                if ($window.localStorage["userInfo"]) {
                    this.userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                }
            }
            AuthenticationService.prototype.GetCurrentUsername = function () {
                return _super.prototype.Get.call(this, 'GetCurrentUsername');
            };
            AuthenticationService.prototype.logout = function () {
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
            };
            AuthenticationService.prototype.getUserInfo = function () {
                return this.userInfo;
            };
            AuthenticationService.$inject = ['$http', '$q', '$window'];
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