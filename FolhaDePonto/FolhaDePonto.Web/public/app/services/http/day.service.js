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
                return _super.prototype.Get.call(this, 'GetDayInfo', '?day=' + this.GetDateFormated(day));
            };
            DayService.prototype.GetDayInfoByYearMonthDay = function (Year, Month, Day) {
                var date = this.GetDateFromYearMonthDay(Year, Month, Day);
                return this.GetDayInfo(date);
            };
            DayService.prototype.EditDay = function (day, InicioExpediente, InicioAlmoco, FimAlmoco, FimExpediente) {
                return _super.prototype.Post.call(this, 'EditDay', {
                    day: this.GetDateFormated(day),
                    InicioExpediente: this.GetTimeSpanFormated(InicioExpediente),
                    InicioAlmoco: this.GetTimeSpanFormated(InicioAlmoco),
                    FimAlmoco: this.GetTimeSpanFormated(FimAlmoco),
                    FimExpediente: this.GetTimeSpanFormated(FimExpediente)
                });
            };
            //helpers - non related http functions - should be on another service
            DayService.prototype.GetDateFromYearMonthDay = function (Year, Month, Day) {
                var date = new Date();
                date.setMonth(Month - 1);
                date.setDate(Day);
                date.setFullYear(Year);
                return date;
            };
            DayService.prototype.GetDateFormated = function (date) {
                return moment(date).format('YYYY-MM-DD');
            };
            DayService.prototype.GetTimeSpanFormated = function (date) {
                return moment(date).format('HH:mm:ss');
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
//# sourceMappingURL=day.service.js.map