'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var certificados = require('../../app/controllers/certificados.server.controller');

	// Certificados Routes
	app.route('/certificados')
		.get(certificados.list)
		// .post(users.requiresLogin, certificados.create);
		.post(certificados.create);

	app.route('/certificados/:certificadoId')
		.get(certificados.read)
		.get(certificados.download)
	// 	// .put(users.requiresLogin, certificados.hasAuthorization, certificados.update)
	// 	 .put(certificados.update)
	// 	// .delete(users.requiresLogin, certificados.hasAuthorization, certificados.delete);
		.delete(certificados.delete);

	// Finish by binding the Certificado middleware
	app.param('certificadoId', certificados.certificadoByID);
};
