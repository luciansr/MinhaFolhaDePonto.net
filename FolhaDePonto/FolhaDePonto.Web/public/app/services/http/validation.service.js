var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FolhaDePonto;
(function (FolhaDePonto) {
    var Services;
    (function (Services) {
        var ValidationService = (function (_super) {
            __extends(ValidationService, _super);
            function ValidationService($http, $q) {
                _super.call(this, $http, $q, 'Validation');
            }
            ValidationService.prototype.GetValidations = function (serverSideModelName, clientSideModelName) {
                return _super.prototype.Get.call(this, 'GetValidations', '?serverSideModelName=' + serverSideModelName + '&clientSideModelName=' + clientSideModelName);
            };
            ValidationService.$inject = ['$http', '$q'];
            return ValidationService;
        })(FolhaDePonto.Base.Service);
        Services.ValidationService = ValidationService;
    })(Services = FolhaDePonto.Services || (FolhaDePonto.Services = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('validationService', FolhaDePonto.Services.ValidationService);
})();
//# sourceMappingURL=validation.service.js.map