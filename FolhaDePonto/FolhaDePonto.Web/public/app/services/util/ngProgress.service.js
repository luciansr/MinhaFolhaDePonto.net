var FolhaDePonto;
(function (FolhaDePonto) {
    var ProgressBar;
    (function (ProgressBar) {
        /**
        Angular Service Name: 'ngProgressService'
        */
        var NGProgressService = (function () {
            function NGProgressService() {
            }
            NGProgressService.prototype.Start = function () {
                NProgress.start();
                console.log('np progress :: start');
            };
            NGProgressService.prototype.Done = function () {
                NProgress.done();
                console.log('np progress :: done');
            };
            NGProgressService.$inject = [];
            return NGProgressService;
        })();
        ProgressBar.NGProgressService = NGProgressService;
    })(ProgressBar = FolhaDePonto.ProgressBar || (FolhaDePonto.ProgressBar = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('ngProgressService', FolhaDePonto.ProgressBar.NGProgressService);
})();
//# sourceMappingURL=ngProgress.service.js.map