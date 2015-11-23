(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .controller('todayController', controller);
    controller.$inject = ['$scope', 'dayService'];
    function controller($scope, dayService) {
        /* jshint validthis:true */
        var vm = this;
        vm.today = new Date();
        activate();
        function activate() {
            dayService.GetDayInfo(vm.today).then(function (data) {
                vm.dia = data;
            });
        }
    }
})();
//# sourceMappingURL=today.controller.js.map