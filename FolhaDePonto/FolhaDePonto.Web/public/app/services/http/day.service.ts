module FolhaDePonto.Services {
    export class DayService extends FolhaDePonto.Base.Service {

        public static $inject = ['$http', '$q'];

        public constructor($http, $q) {
            super($http, $q, 'Day');
        }

        public GetDayInfo(day: Date) {
            return super.Get('GetDayInfo', '?day=' + moment(day).format('YYYY-MM-DD'));
        }

    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('dayService', FolhaDePonto.Services.DayService);

})();