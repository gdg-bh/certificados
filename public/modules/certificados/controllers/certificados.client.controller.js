'use strict';

// Certificados controller
angular.module('certificados').controller('CertificadosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Certificados','Upload',
    function($scope, $stateParams, $location, Authentication, Certificados, Upload) {
        $scope.authentication = Authentication;
        $scope.eventInfo = {};
        // Create new Certificado
        $scope.create = function() {
            // Create new Certificado object
            var certificado = $scope.eventInfo;

            Upload.upload({
                url: '/certificados',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                fields: {
                    eventInfo: certificado
                },
                file: $scope.csvFile,
            }).success(function(response, status) {
                $location.path('certificados/' + response.fileName);
            }).error(function(err) {
                $scope.error = (err.data && err.data.message) ? err.data.message : 'Uknown Error, please contact the system administrator.' ;
            });
        };

        $scope.certificadoId = $stateParams.certificadoId;

    }
]);
