﻿(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .controller('monthController', controller);

    controller.$inject = ['$scope', 'monthService', '$routeParams', '$location']; 

    function controller($scope, monthService: FolhaDePonto.Services.MonthService, $routeParams, $location: ng.ILocationService) {
        /* jshint validthis:true */
        var vm = this;

        vm.month = moment($routeParams.year + '/' + $routeParams.month, ['YYYY/MM']).toDate();

        vm.editDay = editDay;
        vm.previousMonth = previousMonth;
        vm.nextMonth = nextMonth;

        activate();

        function activate() {
            monthService.GetMonthInfo($routeParams.year, $routeParams.month).then(function (data) {
                vm.mes = data;
            });
        }

        

        function editDay(day) {
            $location.path('/Day/' + $routeParams.year + '/' + $routeParams.month + '/' + day.Dia);
        }

        function goToMonth(day: moment.Moment) {
            $location.path('/Month/' + day.format('YYYY/MM'));
        }

        function previousMonth() {
            var mesAnterior: moment.Moment = moment(vm.month).subtract(1, 'months');
            goToMonth(mesAnterior);
        }

        function nextMonth() {
            var mesDepois: moment.Moment = moment(vm.month).add(1, 'months');
            goToMonth(mesDepois);
        }
    }
})();
