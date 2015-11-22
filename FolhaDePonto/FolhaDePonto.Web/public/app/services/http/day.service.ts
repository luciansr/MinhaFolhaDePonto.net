module FolhaDePonto.Services {
    export class DayService extends FolhaDePonto.Base.Service {

        public static $inject = ['$http', '$q'];

        public constructor($http, $q) {
            super($http, $q, 'Day');
        }

        public GetDayInfo(day: Date) {
            return super.Get('GetDayInfo', '?day=' + moment(day).format('YYYY-MM-DD'));
        }

        public GetDayInfoByYearMonthDay(Year: number, Month: number, Day: number) {
            var date = this.GetDateFromYearMonthDay(Year, Month, Day);

            return this.GetDayInfo(date);
        }

        public GetDateFromYearMonthDay(Year: number, Month: number, Day: number): Date {
            var date = new Date();

            date.setMonth(Month - 1);
            date.setDate(Day);
            date.setFullYear(Year);

            return date;
        }

    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('dayService', FolhaDePonto.Services.DayService);

})();