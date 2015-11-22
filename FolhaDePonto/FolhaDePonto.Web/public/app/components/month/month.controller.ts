(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .controller('monthController', controller);

    controller.$inject = ['$scope', 'monthService', '$routeParams']; 

    function controller($scope, monthService: FolhaDePonto.Services.MonthService, $routeParams) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            monthService.GetMonthInfo($routeParams.year, $routeParams.month).then(function (data) {
                vm.mes = data;
            });
        }
    }
})();
