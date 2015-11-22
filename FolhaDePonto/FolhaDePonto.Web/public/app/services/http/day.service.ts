module FolhaDePonto.Services {
    export class DayService extends FolhaDePonto.Base.Service {

        public static $inject = ['$http', '$q'];

        public constructor($http, $q) {
            super($http, $q, 'Day');
        }

        public GetDayInfo(day: Date) {
            return super.Get('GetDayInfo', '?day=' + this.GetDateFormated(day));
        }

        public GetDayInfoByYearMonthDay(Year: number, Month: number, Day: number) {
            var date = this.GetDateFromYearMonthDay(Year, Month, Day);

            return this.GetDayInfo(date);
        }

        public EditDay(day: Date, InicioExpediente: Date, InicioAlmoco: Date, FimAlmoco: Date, FimExpediente: Date) {

            return super.Post('EditDay', {
                day: this.GetDateFormated(day),
                InicioExpediente: this.GetTimeSpanFormated(InicioExpediente),
                InicioAlmoco: this.GetTimeSpanFormated(InicioAlmoco),
                FimAlmoco: this.GetTimeSpanFormated(FimAlmoco),
                FimExpediente: this.GetTimeSpanFormated(FimExpediente)
            });
        }


        //helpers - non related http functions - should be on another service
        public GetDateFromYearMonthDay(Year: number, Month: number, Day: number): Date {
            var date = new Date();

            date.setMonth(Month - 1);
            date.setDate(Day);
            date.setFullYear(Year);

            return date;
        }

        private GetDateFormated(date: Date): string {
            return moment(date).format('YYYY-MM-DD');
        }

        private GetTimeSpanFormated(date: Date): string {
            return moment(date).format('HH:mm:ss');
        }

    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('dayService', FolhaDePonto.Services.DayService);

})();