(function () {
    'use strict';
    angular.module('sections.radio')
        .factory('RadioProgramsServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
            var ref = new Firebase(url + 'radioWidget');
            var programs = $firebaseArray(ref);

            return {
                all: function () {
                    return programs;
                },
                get: function (id) {
                    var program=$firebaseObject(ref.child(id));
                    return program;

                }

            };
        });
})();
