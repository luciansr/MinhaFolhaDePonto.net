(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .controller('dayEditController', controller);
    controller.$inject = ['$scope', 'dayService', '$routeParams', '$location', 'toastrService'];
    function controller($scope, dayService, $routeParams, $location, toastrService) {
        /* jshint validthis:true */
        var vm = this;
        vm.today = dayService.GetDateFromYearMonthDay($routeParams.year, $routeParams.month, $routeParams.day);
        vm.editDay = editDay;
        vm.previousDay = previousDay;
        vm.nextDay = nextDay;
        activate();
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
        function activate() {
            dayService.GetDayInfo(vm.today).then(function (data) {
                vm.dia = data;
                vm.dia.InicioExpediente = initTime(vm.dia.InicioExpediente, 9);
                vm.dia.InicioAlmoco = initTime(vm.dia.InicioAlmoco, 12);
                vm.dia.FimAlmoco = initTime(vm.dia.FimAlmoco, 13);
                vm.dia.FimExpediente = initTime(vm.dia.FimExpediente, 18);
            });
        }
        function editDay() {
            toastrService.Info('Salvando informações sobre dia');
            dayService.EditDay(vm.today, vm.dia.InicioExpediente, vm.dia.InicioAlmoco, vm.dia.FimAlmoco, vm.dia.FimExpediente).then(function () {
                toastrService.Success('Dia salvo com sucesso');
            }, function () {
                toastrService.Error('Erro ao salvar dia');
            });
        }
        function goToDay(day) {
            $location.path('/Day/' + day.format('YYYY/MM/DD'));
        }
        function previousDay() {
            var diaAnterior = moment(vm.today).subtract(1, 'days');
            goToDay(diaAnterior);
        }
        function nextDay() {
            var diaDepois = moment(vm.today).add(1, 'days');
            goToDay(diaDepois);
        }
    }
})();
