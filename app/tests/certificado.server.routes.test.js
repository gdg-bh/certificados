'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Certificado = mongoose.model('Certificado'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, certificado;

/**
 * Certificado routes tests
 */
describe('Certificado Generation Tests', function() {
    // beforeEach(function(done) {
    // 	// Create user credentials
    // 	credentials = {
    // 		username: 'username',
    // 		password: 'password'
    // 	};

    // 	// Create a new user
    // 	user = new User({
    // 		firstName: 'Full',
    // 		lastName: 'Name',
    // 		displayName: 'Full Name',
    // 		email: 'test@test.com',
    // 		username: credentials.username,
    // 		password: credentials.password,
    // 		provider: 'local'
    // 	});

    // 	// Save a user to the test db and create new Certificado
    // 	user.save(function() {
    // 		certificado = {
    // 			name: 'Certificado Name'
    // 		};

    // 		done();
    // 	});
    // });

    it('should be able to generate Certificados instances', function(done) {
         // agent.post('/auth/signin')
         //    // .send(credentials)
         //    .expect(200)
         //    .end(function(signinErr, signinRes) {
         //        // Handle signin error
         //        if (signinErr) done(signinErr);

                // Get the userId
                // var userId = user.id;

                // Save a new Certificado
                agent.post('/certificados')
                    // .send(certificado)
                    .expect(200)
                    .end(function(certificadoSaveErr, certificadoSaveRes) {
                        // Handle Certificado save error
                        if (certificadoSaveErr) done(certificadoSaveErr);

                        // Get a list of Certificados
                        agent.get('/certificados')
                            .end(function(certificadosGetErr, certificadosGetRes) {
                                // Handle Certificado save error
                                if (certificadosGetErr) done(certificadosGetErr);

                                // Get Certificados list
                                var certificados = certificadosGetRes.body;

                                // Set assertions
                                (certificados[0].user._id).should.equal(userId);
                                (certificados[0].name).should.match('Certificado Name');

                                // Call the assertion callback
                                done();
                            });
                    });
            // });
    });

    // it('should not be able to save Certificado instance if not logged in', function(done) {
    // 	agent.post('/certificados')
    // 		.send(certificado)
    // 		.expect(401)
    // 		.end(function(certificadoSaveErr, certificadoSaveRes) {
    // 			// Call the assertion callback
    // 			done(certificadoSaveErr);
    // 		});
    // });

    // it('should not be able to save Certificado instance if no name is provided', function(done) {
    // 	// Invalidate name field
    // 	certificado.name = '';

    // 	agent.post('/auth/signin')
    // 		.send(credentials)
    // 		.expect(200)
    // 		.end(function(signinErr, signinRes) {
    // 			// Handle signin error
    // 			if (signinErr) done(signinErr);

    // 			// Get the userId
    // 			var userId = user.id;

    // 			// Save a new Certificado
    // 			agent.post('/certificados')
    // 				.send(certificado)
    // 				.expect(400)
    // 				.end(function(certificadoSaveErr, certificadoSaveRes) {
    // 					// Set message assertion
    // 					(certificadoSaveRes.body.message).should.match('Please fill Certificado name');

    // 					// Handle Certificado save error
    // 					done(certificadoSaveErr);
    // 				});
    // 		});
    // });


    afterEach(function(done) {
        User.remove().exec();
        Certificado.remove().exec();
        done();
    });
});
