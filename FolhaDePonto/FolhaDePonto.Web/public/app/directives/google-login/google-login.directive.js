var gapi;
var GoogleAuth;
var googleApiId;
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .directive('googleLogin', directive);
    directive.$inject = [];
    function directive() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'public/app/directives/google-login/google-login.template.html',
            controller: controller,
            controllerAs: 'googleLoginCtrl'
        };
        controller.$inject = ['$scope', 'authenticationService'];
        function controller($scope, authenticationService) {
            var self = this;
            //GoogleAuth.then(activate, onFailure)
            self.teste = function () { alert('teste'); };
            activate();
            function activate() {
                if (!gapi) {
                    setTimeout(activate, 100);
                    return;
                }
                function onSuccess(googleUser) {
                    var profile = googleUser.getBasicProfile();
                    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                    console.log('Name: ' + profile.getName());
                    console.log('Image URL: ' + profile.getImageUrl());
                    console.log('Email: ' + profile.getEmail());
                    var id_token = googleUser.getAuthResponse().id_token;
                    //console.log('Token: ' + id_token);
                    authenticationService.googleLogin(id_token);
                }
                gapi.load('auth2', function () {
                    // Retrieve the singleton for the GoogleAuth library and set up the client.
                    //gapi.auth2.GoogleAuth
                    //gapi.auth2.init({
                    //    client_id: googleApiId + '.apps.googleusercontent.com'
                    //    // Additional optional params
                    //});
                    //attachSignin(document.getElementById('customBtn'));
                    gapi.signin2.render("google-sign-in-button", {
                        'client_id': googleApiId + '.apps.googleusercontent.com',
                        'scope': 'email',
                        'width': 191,
                        'height': 46,
                        'longtitle': false,
                        'theme': 'dark',
                        'onsuccess': onSuccess,
                        'onfailure': function () {
                        }
                    });
                });
            }
        }
        return directive;
    }
})();
//# sourceMappingURL=google-login.directive.js.map