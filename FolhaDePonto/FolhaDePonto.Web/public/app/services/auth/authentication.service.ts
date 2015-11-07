module FolhaDePonto {
    export module Services {
        export class AuthenticationService extends FolhaDePonto.Base.Service {

            public static $inject = ['$http', '$q'];

            public constructor($http, $q) {
                super($http, $q, 'Authentication');
            }

            public GetCurrentUsername() {
                return super.Get('GetCurrentUsername');
            }
        }
    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('authenticationService', FolhaDePonto.Services.AuthenticationService);

})();