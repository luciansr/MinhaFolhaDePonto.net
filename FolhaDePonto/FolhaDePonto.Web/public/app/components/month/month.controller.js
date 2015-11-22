(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .controller('monthController', controller);
    controller.$inject = ['$scope', 'monthService', '$routeParams', '$location'];
    function controller($scope, monthService, $routeParams, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.editDay = editDay;
        activate();
        function activate() {
            monthService.GetMonthInfo($routeParams.year, $routeParams.month).then(function (data) {
                vm.mes = data;
            });
        }
        function editDay(day) {
            $location.path('/Day/' + $routeParams.year + '/' + $routeParams.month + '/' + day.Dia);
        }
    }
})();
//# sourceMappingURL=month.controller.js.map