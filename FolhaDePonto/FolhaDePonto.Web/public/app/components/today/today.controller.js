(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .controller('todayController', controller);
    controller.$inject = ['$scope', 'dayService', 'toastrService', '$location'];
    function controller($scope, dayService, toastrService, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.today = new Date();
        vm.startClicked = startClicked;
        vm.endClicked = endClicked;
        vm.goToEditPage = goToEditPage;
        function initTime(dateString, Hours, Minutes) {
            var date = new Date();
            if (!dateString) {
                date = angular.copy(vm.today);
                date.setHours(Hours);
                date.setMinutes(Minutes ? Minutes : 0);
                date.setSeconds(0);
                date.setUTCMilliseconds(0);
            }
            else {
                date = moment(dateString, ['HH:mm:ss']).toDate();
            }
            return date;
        }
        activate();
        function activate() {
            dayService.GetDayInfo(vm.today).then(function (data) {
                vm.dia = data;
                vm.dia.InicioAlmoco = initTime(vm.dia.InicioAlmoco, 12);
                vm.dia.FimAlmoco = initTime(vm.dia.FimAlmoco, 13);
            });
        }
        function startClicked() {
            vm.dia.InicioExpediente = new Date();
            editDay();
        }
        function endClicked() {
            vm.dia.FimExpediente = new Date();
            editDay();
        }
        function editDay() {
            toastrService.Info('Salvando informações');
            dayService.EditDay(vm.today, vm.dia.InicioExpediente, vm.dia.InicioAlmoco, vm.dia.FimAlmoco, vm.dia.FimExpediente).then(function () {
                toastrService.Success('Informações salvas');
            }, function () {
                toastrService.Error('Erro ao salvar informações');
            });
        }
        function goToEditPage() {
            $location.path('/Day/' + moment(vm.today).format('YYYY/MM/DD'));
        }
    }
})();
//# sourceMappingURL=today.controller.js.map