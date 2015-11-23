(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .controller('loginController', controller);
    controller.$inject = ['$scope'];
    function controller($scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'home';
        activate();
        function activate() { }
    }
})();
//# sourceMappingURL=login.controller.js.map