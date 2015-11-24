var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FolhaDePonto;
(function (FolhaDePonto) {
    var Services;
    (function (Services) {
        var MonthService = (function (_super) {
            __extends(MonthService, _super);
            function MonthService($http, $q) {
                _super.call(this, $http, $q, 'Month');
            }
            MonthService.prototype.GetMonthInfo = function (Year, Month) {
                return _super.prototype.Get.call(this, 'GetMonthInfo', '?Year=' + Year + '&Month=' + Month);
            };
            MonthService.$inject = ['$http', '$q'];
            return MonthService;
        })(FolhaDePonto.Base.Service);
        Services.MonthService = MonthService;
    })(Services = FolhaDePonto.Services || (FolhaDePonto.Services = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('monthService', FolhaDePonto.Services.MonthService);
})();
//# sourceMappingURL=month.service.js.map