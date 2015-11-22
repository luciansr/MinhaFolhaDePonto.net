var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FolhaDePonto;
(function (FolhaDePonto) {
    var Services;
    (function (Services) {
        var DayService = (function (_super) {
            __extends(DayService, _super);
            function DayService($http, $q) {
                _super.call(this, $http, $q, 'Day');
            }
            DayService.prototype.GetDayInfo = function (day) {
                return _super.prototype.Get.call(this, 'GetDayInfo', '?day=' + moment(day).format('YYYY-MM-DD'));
            };
            DayService.prototype.GetDayInfoByYearMonthDay = function (Year, Month, Day) {
                var date = this.GetDateFromYearMonthDay(Year, Month, Day);
                return this.GetDayInfo(date);
            };
            DayService.prototype.GetDateFromYearMonthDay = function (Year, Month, Day) {
                var date = new Date();
                date.setMonth(Month - 1);
                date.setDate(Day);
                date.setFullYear(Year);
                return date;
            };
            DayService.$inject = ['$http', '$q'];
            return DayService;
        })(FolhaDePonto.Base.Service);
        Services.DayService = DayService;
    })(Services = FolhaDePonto.Services || (FolhaDePonto.Services = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('dayService', FolhaDePonto.Services.DayService);
})();
