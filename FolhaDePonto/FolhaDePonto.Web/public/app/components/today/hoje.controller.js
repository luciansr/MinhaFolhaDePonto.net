(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .controller('hojeController', controller);
    controller.$inject = ['$scope'];
    function controller($scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'hoje';
        activate();
        function activate() { }
    }
})();
