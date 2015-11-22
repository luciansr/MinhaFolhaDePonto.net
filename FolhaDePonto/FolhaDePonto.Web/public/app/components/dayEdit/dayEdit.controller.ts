(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .controller('dayEditController', controller);

    controller.$inject = ['$scope', 'dayService', '$routeParams'];

    function controller($scope, dayService: FolhaDePonto.Services.DayService, $routeParams) {
        /* jshint validthis:true */
        var vm = this;

        vm.today = dayService.GetDateFromYearMonthDay($routeParams.year, $routeParams.month, $routeParams.day);

        activate();

        function initTimeIfNull(date: Date, Hours: number, Minutes?: number) {
            if (!date) {
                date = angular.copy(vm.today);
                (<Date>date).setHours(Hours);
                (<Date>date).setMinutes(Minutes ? Minutes : 0);
                (<Date>date).setSeconds(0);
                (<Date>date).setUTCMilliseconds(0);
            }

            return date;
        }

        function activate() {
            dayService.GetDayInfo(vm.today).then(function (data) {
                vm.dia = data;

                vm.dia.InicioExpediente = initTimeIfNull(vm.dia.InicioExpediente, 9);
                vm.dia.InicioAlmoco = initTimeIfNull(vm.dia.InicioAlmoco, 12);
                vm.dia.FimAlmoco = initTimeIfNull(vm.dia.FimAlmoco, 13);
                vm.dia.FimExpediente = initTimeIfNull(vm.dia.FimExpediente, 18);

            });

        }

       

    }
})();

