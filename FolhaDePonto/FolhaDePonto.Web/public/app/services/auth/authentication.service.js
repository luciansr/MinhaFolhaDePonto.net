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
            function AuthenticationService($http, $q) {
                _super.call(this, $http, $q, 'Authentication');
            }
            AuthenticationService.prototype.GetCurrentUsername = function () {
                return _super.prototype.Get.call(this, 'GetCurrentUsername');
            };
            AuthenticationService.$inject = ['$http', '$q'];
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
