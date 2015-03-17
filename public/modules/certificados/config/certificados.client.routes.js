'use strict';

//Setting up route
angular.module('certificados').config(['$stateProvider',
	function($stateProvider) {
		// Certificados state routing
		$stateProvider.
		state('listCertificados', {
			url: '/certificados',
			templateUrl: 'modules/certificados/views/list-certificados.client.view.html'
		}).
		state('createCertificado', {
			url: '/certificados/create',
			templateUrl: 'modules/certificados/views/create-certificado.client.view.html'
		}).
		state('viewCertificado', {
			url: '/certificados/:certificadoId',
			templateUrl: 'modules/certificados/views/view-certificado.client.view.html'
		}).
		state('editCertificado', {
			url: '/certificados/:certificadoId/edit',
			templateUrl: 'modules/certificados/views/edit-certificado.client.view.html'
		});
	}
]);