var gapi: any;
var GoogleAuth: any;

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .directive('googleLogin', directive);

    directive.$inject = [];

    function directive() {
        var directive = {
            restrict: 'EA',
            scope: {
                appId: '@'
            },
            templateUrl: 'public/app/directives/google-login/google-login.template.html',
            controller: controller,
            controllerAs: 'googleLoginCtrl'
        };

        controller.$inject = ['$scope'];

        function controller($scope) {
            var self = this;
           
            //GoogleAuth.then(activate, onFailure)

            self.teste = function () { alert('teste') };

            activate();

            function activate() {
                if (!gapi) {
                    setTimeout(activate, 100);
                    return;
                }

                gapi.load('auth2', function () {
                    // Retrieve the singleton for the GoogleAuth library and set up the client.
                    gapi.auth2.init({
                        client_id: $scope.appId + '.apps.googleusercontent.com'
                        // Additional optional params
                    });
                    //attachSignin(document.getElementById('customBtn'));

                    gapi.signin2.render("google-sign-in-button", {
                        'client_id': $scope.appId + '.apps.googleusercontent.com',
                        'scope': 'email',
                        'width': 191,
                        'height': 46,
                        'longtitle': false,
                        'theme': 'dark',
                        'onsuccess': function (user) {
                            console.log(user);
                        },
                        'onfailure': function () {

                        }
                    });
                });

            }
        }

        return directive;
    }

})();