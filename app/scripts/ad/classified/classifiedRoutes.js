(function () {
    'use strict'
    angular.module('ad.classified', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                /*=ad*/
                /*classified*/
                .state("app.classified", {
                    abstract:true,
                    url: "/classifieds",
                    resolve:{
                        clsLive: function (ClassifiedServ) {
                            return ClassifiedServ.bindClassifiedsLive();
                        }
                    },
                    controller: "ClassifiedCtrl as classified",
                    templateUrl: "scripts/ad/classified/views/classifiedCtrl.html"
                })
                .state("app.classified.general", {
                    url: "/:clSection/:clId?",
                    controller: "OneClassifiedCtrl as oneClassified",
                    templateUrl: "scripts/ad/classified/views/one-classifiedCtrl.html"
                })

//#state'
        });
})();
