module FolhaDePonto {
    export module Base {
        export class Service {

            private $http: ng.IHttpService;
            private $q: ng.IQService;

            private baseServiceUrl;

            public constructor($http: ng.IHttpService, $q: ng.IQService, controllerName: string) {
                this.$http = $http;
                this.$q = $q;
                this.baseServiceUrl = '/api/' + controllerName;
            }

            private GetCleanStringParameters(stringParameters: string) : string {
                if (stringParameters && stringParameters.length > 0) {
                    return stringParameters;
                }

                return '';
            }

            private GetUrl(actionUrl: string, stringParameters?: string): string {
                return this.baseServiceUrl + '/' + actionUrl + this.GetCleanStringParameters(stringParameters);
            }

            public Get(actionUrl: string, stringParameters?: string) {
                let defer = this.$q.defer();

                var url = this.GetUrl(actionUrl, stringParameters);

                this.$http.get(url).then(function (data) {
                    defer.resolve(data.data);
                }, function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            }

            public Post(actionUrl: string, data: any) {
                let defer = this.$q.defer();

                var url = this.GetUrl(actionUrl);

                this.$http.post(url, data).then(function (data) {
                    defer.resolve(data.data);
                }, function (error) {
                    defer.reject(error);
                });
                
                return defer.promise;
            }
        }
    }
}