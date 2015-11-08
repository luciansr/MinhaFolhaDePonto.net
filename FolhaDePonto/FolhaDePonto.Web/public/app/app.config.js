(function () {
    'use strict';
    angular.module('folhaDePonto').config(routeConfig);
    angular.module('folhaDePonto').config(httpIntercept);
    angular.module('folhaDePonto').config(blockConfig);
    angular.module('folhaDePonto').run(stopCachingViews);
    angular.module('folhaDePonto').run(resolveAuthenticationConfig);
    blockConfig.$inject = ['blockUIConfig'];
    routeConfig.$inject = ['$routeProvider'];
    httpIntercept.$inject = ['$httpProvider'];
    stopCachingViews.$inject = ['$rootScope', '$templateCache'];
    resolveAuthenticationConfig.$inject = ['$rootScope', '$window', '$location', 'toastrService'];
    function routeConfig($routeProvider) {
        var resolveAuthentication = function (allowedRoles) {
            var authObj = {
                auth: ["$q", "AccountService", function ($q, AccountService) {
                        var userInfo = AccountService.getUserInfo();
                        if (userInfo) {
                            if (AccountService.UserHasAccess(allowedRoles)) {
                                return $q.when(userInfo);
                            }
                            else {
                                return $q.reject({ authenticated: true, allowedAccess: false });
                            }
                        }
                        else {
                            return $q.reject({ authenticated: false });
                        }
                    }]
            };
            return authObj;
        };
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
    function resolveAuthenticationConfig($rootScope, $window, $location, toastrService) {
        $rootScope.$on("$routeChangeSuccess", function (userInfo) {
            //do something, or nothing
        });
        $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
                toastrService.Warning('É necessário fazer login para ter acesso a esta função.');
                $location.path('/Login');
            }
            else if (eventObj.allowedAccess === false) {
            }
        });
    }
})();
