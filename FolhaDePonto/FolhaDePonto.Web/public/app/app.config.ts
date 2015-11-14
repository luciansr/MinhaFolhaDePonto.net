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
        var resolveAuthentication = (allowedRoles: Array<string>) => {

            var authObj = {
                auth: ["$q", "authenticationService", function ($q, authenticationService: FolhaDePonto.Services.AuthenticationService) {
                    var userInfo = authenticationService.getUserInfo();

                    if (userInfo) {
                        if (authenticationService.UserHasAccess(allowedRoles)) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: true, allowedAccess: false });
                        }

                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }

            return authObj;
        };


        $routeProvider
            .when('/', {
                redirectTo: 'Today'
            })
            .when('/Login', {
                templateUrl: 'public/app/components/login/login.html',
                controller: 'loginController as loginCtrl'
            })
            .when('/Today', {
                templateUrl: 'public/app/components/today/today.html',
                controller: 'todayController as todayCtrl',
                resolve: resolveAuthentication([])
            })
            .when('/Home', {
                templateUrl: 'public/app/components/home/home.html',
                controller: 'homeController as homeCtrl',
                resolve: resolveAuthentication([])
            })
            .otherwise({
                redirectTo: '/Home'
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

    function resolveAuthenticationConfig($rootScope, $window, $location, toastrService: FolhaDePonto.Log.ToastrService) {
        $rootScope.$on("$routeChangeSuccess", function (userInfo) {
            //do something, or nothing
        });

        $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
                //toastrService.Info('Faça login e comece a usar sua foçl');
                $location.path('/Login');
            } else if (eventObj.allowedAccess === false) {
                //console.log('Not allowed access - current: ' + current.$$route.originalPath, ', previous: ' + previous !== undefined && previous !== null ? previous.$$route.originalPath : '' + '.'); 
            }
        });
    }

})();