module FolhaDePonto.Services {
    export class MonthService extends FolhaDePonto.Base.Service {

        public static $inject = ['$http', '$q'];

        public constructor($http, $q) {
            super($http, $q, 'Month');
        }

        public GetMonthInfo(Year: number, Month: number) {
            return super.Get('GetMonthInfo', '?Year=' + Year + '&Month=' + Month);
        }

    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('monthService', FolhaDePonto.Services.MonthService);

})();