(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .directive('folhaHeader', directive);
    directive.$inject = [];
    function directive() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'public/app/directives/folha-header/folha-header.template.html',
            controller: controller,
            controllerAs: 'folhaHeaderCtrl'
        };
        controller.$inject = ['$location', 'authenticationService'];
        function controller($location, authenticationService) {
            var self = this;
            var menuHash = {};
            self.isActive = isActive;
            self.hasChildNodes = hasChildNodes;
            self.logout = logout;
            var hoje = new Date();
            self.menu = [
                {
                    title: 'Hoje',
                    href: '#/Today'
                },
                {
                    title: 'Mês atual',
                    href: '#/Month/' + hoje.getFullYear() + '/' + (hoje.getMonth() + 1)
                }
            ];
            function isActive(item) {
                if (item.href == '#' + $location.path())
                    return true;
                if (item.childNodes) {
                    for (var i in item.childNodes) {
                        var child = item.childNodes[i];
                        if (child.href == '#' + $location.path())
                            return true;
                    }
                }
                return false;
            }
            function hasChildNodes(item) {
                if (menuHash[item.$$hashKey] !== undefined)
                    return menuHash[item.$$hashKey];
                //console.log(item);
                menuHash[item.$$hashKey] = item.childNodes !== undefined && item.childNodes.length > 0;
                return menuHash[item.$$hashKey];
            }
            function logout() {
                authenticationService.logout();
            }
        }
        return directive;
    }
})();
//# sourceMappingURL=folha-header.directive.js.map