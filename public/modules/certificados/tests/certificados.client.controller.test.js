'use strict';

(function() {
	// Certificados Controller Spec
	describe('Certificados Controller Tests', function() {
		// Initialize global variables
		var CertificadosController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Certificados controller.
			CertificadosController = $controller('CertificadosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Certificado object fetched from XHR', inject(function(Certificados) {
			// Create sample Certificado using the Certificados service
			var sampleCertificado = new Certificados({
				name: 'New Certificado'
			});

			// Create a sample Certificados array that includes the new Certificado
			var sampleCertificados = [sampleCertificado];

			// Set GET response
			$httpBackend.expectGET('certificados').respond(sampleCertificados);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.certificados).toEqualData(sampleCertificados);
		}));

		it('$scope.findOne() should create an array with one Certificado object fetched from XHR using a certificadoId URL parameter', inject(function(Certificados) {
			// Define a sample Certificado object
			var sampleCertificado = new Certificados({
				name: 'New Certificado'
			});

			// Set the URL parameter
			$stateParams.certificadoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/certificados\/([0-9a-fA-F]{24})$/).respond(sampleCertificado);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.certificado).toEqualData(sampleCertificado);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Certificados) {
			// Create a sample Certificado object
			var sampleCertificadoPostData = new Certificados({
				name: 'New Certificado'
			});

			// Create a sample Certificado response
			var sampleCertificadoResponse = new Certificados({
				_id: '525cf20451979dea2c000001',
				name: 'New Certificado'
			});

			// Fixture mock form input values
			scope.name = 'New Certificado';

			// Set POST response
			$httpBackend.expectPOST('certificados', sampleCertificadoPostData).respond(sampleCertificadoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Certificado was created
			expect($location.path()).toBe('/certificados/' + sampleCertificadoResponse._id);
		}));

		it('$scope.update() should update a valid Certificado', inject(function(Certificados) {
			// Define a sample Certificado put data
			var sampleCertificadoPutData = new Certificados({
				_id: '525cf20451979dea2c000001',
				name: 'New Certificado'
			});

			// Mock Certificado in scope
			scope.certificado = sampleCertificadoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/certificados\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/certificados/' + sampleCertificadoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid certificadoId and remove the Certificado from the scope', inject(function(Certificados) {
			// Create new Certificado object
			var sampleCertificado = new Certificados({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Certificados array and include the Certificado
			scope.certificados = [sampleCertificado];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/certificados\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCertificado);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.certificados.length).toBe(0);
		}));
	});
}());