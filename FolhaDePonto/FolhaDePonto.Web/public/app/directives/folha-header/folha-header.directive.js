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
        controller.$inject = ['$location'];
        function controller($location) {
            var self = this;
            self.isActive = isActive;
            var menuHash = {};
            self.hasChildNodes = hasChildNodes;
            self.menu = [
                {
                    title: 'Início',
                    childNodes: [
                        {
                            title: 'Home',
                            href: '#/'
                        }
                    ]
                },
                {
                    title: 'Início 2',
                    childNodes: [
                        {
                            title: 'Home 2',
                            href: '#/2'
                        }
                    ]
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
        }
        return directive;
    }
})();
