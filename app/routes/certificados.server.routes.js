'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var certificados = require('../../app/controllers/certificados.server.controller');

	// Certificados Routes
	app.route('/certificados')
		// .get(certificados.list)
		.post(certificados.create);

	app.route('/certificados/:downloadId').get(certificados.download);
};
