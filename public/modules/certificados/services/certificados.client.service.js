'use strict';

//Certificados service used to communicate Certificados REST endpoints
angular.module('certificados').factory('Certificados', ['$resource',
    function($resource) {
        return $resource('certificados/:certificadoId', {
            certificadoId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
