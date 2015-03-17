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
                $location.path('/#!/certificados/' + response.cert_id);

                // console.log(response.status);
                // $location.path('/');
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.download = function(){
        	var certificado = Certificados.get({
                certificadoId: $stateParams.certificadoId
            });
        	$scope.dowloadLink = certificado.filePath;
        }

        // Remove existing Certificado
        $scope.remove = function(certificado) {
            if (certificado) {
                certificado.$remove();

                for (var i in $scope.certificados) {
                    if ($scope.certificados[i] === certificado) {
                        $scope.certificados.splice(i, 1);
                    }
                }
            } else {
                $scope.certificado.$remove(function() {
                    $location.path('certificados');
                });
            }
        };

        // Update existing Certificado
        $scope.update = function() {
            var certificado = $scope.certificado;

            certificado.$update(function() {
                $location.path('certificados/' + certificado._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Certificados
        $scope.find = function() {
            $scope.certificados = Certificados.query();
        };

        // Find existing Certificado
        $scope.findOne = function() {
            $scope.certificado = Certificados.get({
                certificadoId: $stateParams.certificadoId
            });
        };
    }
]);
