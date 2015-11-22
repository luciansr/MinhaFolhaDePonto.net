(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .controller('dayEditController', controller);
    controller.$inject = ['$scope', 'dayService', '$routeParams'];
    function controller($scope, dayService, $routeParams) {
        /* jshint validthis:true */
        var vm = this;
        vm.today = dayService.GetDateFromYearMonthDay($routeParams.year, $routeParams.month, $routeParams.day);
        activate();
        function initTimeIfNull(date, Hours, Minutes) {
            if (!date) {
                date = angular.copy(vm.today);
                date.setHours(Hours);
                date.setMinutes(Minutes ? Minutes : 0);
                date.setSeconds(0);
                date.setUTCMilliseconds(0);
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
