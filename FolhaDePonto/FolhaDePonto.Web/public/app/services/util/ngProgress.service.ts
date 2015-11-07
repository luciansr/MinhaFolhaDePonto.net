module FolhaDePonto {
    export module ProgressBar {
        declare var NProgress;

        /**
        Angular Service Name: 'ngProgressService'
        */
        export class NGProgressService {

            public static $inject = [];

            public Start() {
                NProgress.start();
                console.log('np progress :: start');
            }

            public Done() {
                NProgress.done();
                console.log('np progress :: done');
            }
        }
    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('ngProgressService', FolhaDePonto.ProgressBar.NGProgressService);

})();