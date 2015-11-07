(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .directive('folhaTable', directive);
    directive.$inject = [];
    function directive() {
        var directive = {
            restrict: 'EA',
            scope: {
                header: '@',
                showLineNumbers: '@',
                columns: '=',
                fields: '='
            },
            templateUrl: 'public/app/directives/folha-table/folha-table.template.html',
            controller: controller,
            controllerAs: 'folhaTableCtrl'
        };
        controller.$inject = [];
        function controller() {
            var self = this;
            self.offset = 0;
            activate();
            function activate() {
            }
        }
        return directive;
    }
})();
