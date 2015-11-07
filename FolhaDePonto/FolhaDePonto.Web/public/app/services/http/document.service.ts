module FolhaDePonto {
    export module Services {
        export class DocumentService extends FolhaDePonto.Base.Service {

            public static $inject = ['$http', '$q'];

            public constructor($http, $q) {
                super($http, $q, 'Document');
            }

            //public GetValidations(serverSideModelName: string, clientSideModelName: string) {
            //    return super.Get('GetValidations', '?serverSideModelName=' + serverSideModelName + '&clientSideModelName=' + clientSideModelName);
            //}
        }
    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('documentService', FolhaDePonto.Services.DocumentService);

})();