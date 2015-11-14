(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .controller('monthController', controller);

    controller.$inject = ['$scope']; 

    function controller($scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.today = new Date();

        activate();

        function activate() { }
    }
})();
