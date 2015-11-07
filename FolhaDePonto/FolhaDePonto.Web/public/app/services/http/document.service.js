var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FolhaDePonto;
(function (FolhaDePonto) {
    var Services;
    (function (Services) {
        var DocumentService = (function (_super) {
            __extends(DocumentService, _super);
            function DocumentService($http, $q) {
                _super.call(this, $http, $q, 'Document');
            }
            DocumentService.$inject = ['$http', '$q'];
            return DocumentService;
        })(FolhaDePonto.Base.Service);
        Services.DocumentService = DocumentService;
    })(Services = FolhaDePonto.Services || (FolhaDePonto.Services = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('documentService', FolhaDePonto.Services.DocumentService);
})();
