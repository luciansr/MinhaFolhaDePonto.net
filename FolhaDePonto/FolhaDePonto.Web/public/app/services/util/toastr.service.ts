module FolhaDePonto {

    export module Log {

        declare var toastr;

        export class ToastrService {

            public static $inject = [];

            /**
            Mostra toast de sucesso (verde)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            public Success(text: string, title?: string) {
                toastr.success(text, title);
            }

            /**
            Mostra toast de Error (vermmelho)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            public Error(text: string, title?: string) {
                toastr.error(text, title);
            }

            /**
            Mostra toast de Atenção (laranja)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            public Warning(text: string, title?: string) {
                toastr.warning(text, title);
            }

            /**
            Mostra toast de Informação (azul)
            @param text Texto a ser exibido
            @param title Título a ser exibido
            */
            public Info(text: string, title?: string) {
                toastr.info(text, title);
            }

            /**
            Remove toasts atuais usando animação
            */
            public Clear() {
                toastr.clear();
            }

            /**
            Remove toasts atuais imediatamente
            */
            public Remove() {
                toastr.remove();
            }
        }
    }
}

(function () {
    'use strict';

    angular
        .module('folhaDePonto')
        .service('toastrService', FolhaDePonto.Log.ToastrService);

})();