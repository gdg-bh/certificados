'use strict';

// Certificados controller
angular.module('certificados').controller('CertificadosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Certificados',
    function($scope, $stateParams, $location, Authentication, Certificados) {
        $scope.authentication = Authentication;

        // Create new Certificado
        $scope.create = function() {
            // Create new Certificado object
            var certificado = new Certificados({
                name: this.name
            });

            // Redirect after save
            certificado.$save(function(response) {
                $location.path('certificados/' + response.fileName);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.certificadoId = $stateParams.certificadoId;

    }
]);
