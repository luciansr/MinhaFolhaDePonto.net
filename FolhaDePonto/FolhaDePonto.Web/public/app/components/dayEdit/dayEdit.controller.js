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
        function activate() {
            dayService.GetDayInfo(vm.today).then(function (data) {
                vm.dia = data;
            });
        }
    }
})();
//# sourceMappingURL=dayEdit.controller.js.map