'use strict';

// Configuring the Articles module
angular.module('certificados').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Certificados', 'certificados', 'dropdown', '/certificados(/create)?');
		Menus.addSubMenuItem('topbar', 'certificados', 'List Certificados', 'certificados');
		Menus.addSubMenuItem('topbar', 'certificados', 'New Certificado', 'certificados/create');
	}
]);