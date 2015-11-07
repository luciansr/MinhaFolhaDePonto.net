module FolhaDePonto {
    export module Services {
        export class ValidationService extends FolhaDePonto.Base.Service {

            public static $inject = ['$http', '$q'];

            public constructor($http, $q) {
                super($http, $q, 'Validation');
            }

            public GetValidations(serverSideModelName: string, clientSideModelName: string) {
                return super.Get('GetValidations', '?serverSideModelName=' + serverSideModelName + '&clientSideModelName=' + clientSideModelName);
            }
        }
    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('validationService', FolhaDePonto.Services.ValidationService);

})();