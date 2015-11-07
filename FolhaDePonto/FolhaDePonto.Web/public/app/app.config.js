(function () {
    'use strict';
    angular.module('folhaDePonto').config(routeConfig);
    angular.module('folhaDePonto').config(httpIntercept);
    angular.module('folhaDePonto').config(blockConfig);
    angular.module('folhaDePonto').run(stopCachingViews);
    blockConfig.$inject = ['blockUIConfig'];
    routeConfig.$inject = ['$routeProvider'];
    httpIntercept.$inject = ['$httpProvider'];
    stopCachingViews.$inject = ['$rootScope', '$templateCache'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'public/app/components/home/home.html',
            controller: 'homeController as homeCtrl'
        })
            .otherwise({
            redirectTo: '/'
        });
    }
    function httpIntercept($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptorService');
    }
    function stopCachingViews($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof (current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
        });
    }
    function blockConfig(blockUIConfig) {
        blockUIConfig.message = 'Carregando';
        blockUIConfig.delay = 200;
        blockUIConfig.templateUrl = 'public/libs/block-ui/block-ui-template.html';
    }
})();
