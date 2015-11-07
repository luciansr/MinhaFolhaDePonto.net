var FolhaDePonto;
(function (FolhaDePonto) {
    var Log;
    (function (Log) {
        var ToastrService = (function () {
            function ToastrService() {
            }
            /**
            Mostra toast de sucesso (verde)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            ToastrService.prototype.Success = function (text, title) {
                toastr.success(text, title);
            };
            /**
            Mostra toast de Error (vermmelho)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            ToastrService.prototype.Error = function (text, title) {
                toastr.error(text, title);
            };
            /**
            Mostra toast de Atenção (laranja)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            ToastrService.prototype.Warning = function (text, title) {
                toastr.warning(text, title);
            };
            /**
            Mostra toast de Informação (azul)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            ToastrService.prototype.Info = function (text, title) {
                toastr.info(text, title);
            };
            /**
            Remove toasts atuais usando animação
            */
            ToastrService.prototype.Clear = function () {
                toastr.clear();
            };
            /**
            Remove toasts atuais imediatamente
            */
            ToastrService.prototype.Remove = function () {
                toastr.remove();
            };
            ToastrService.$inject = [];
            return ToastrService;
        })();
        Log.ToastrService = ToastrService;
    })(Log = FolhaDePonto.Log || (FolhaDePonto.Log = {}));
})(FolhaDePonto || (FolhaDePonto = {}));
(function () {
    'use strict';
    angular
        .module('folhaDePonto')
        .service('toastrService', FolhaDePonto.Log.ToastrService);
})();
//# sourceMappingURL=toastr.service.js.map