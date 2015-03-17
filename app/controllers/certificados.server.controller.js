'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    phantom = require('phantom'),
    temp = require('temp'),
    swig = require('swig'),
    errorHandler = require('./errors.server.controller'),
    Certificado = mongoose.model('Certificado'),
    _ = require('lodash');

/**
 * Generate Certificado
 */
exports.create = function(req, res) {
    var certificado = new Certificado(req.body);
    var tempName = temp.path({
        suffix: '.pdf'
    });

    phantom.create(function(ph) {
        ph.createPage(function(page) {
            page.settings = {
                loadImages: true,
                localToRemoteUrlAccessEnabled: true,
                javascriptEnabled: true,
                loadPlugins: false
            };

            page.set('paperSize', {
                format: 'A4',
                orientation: 'portrait',
                border: '1cm'
            });

            var html = swig.renderFile('public/modules/certificados/views/template-certificado.cliente.view.html', {
                name: 'Participante 1',
                eventName: 'GDG-BH Extended'
            });

            page.setContent(html,'http://gdhbh.com' );

            page.render(tempName, function(error) {
                if (error) console.log('Error rendering PDF: %s', error);
                ph.exit();
            });
        });
    });

    var stripfileName = tempName.substring(tempName.lastIndexOf('/') + 1, tempName.length);
    res.jsonp({
        fileName: stripfileName
    });
};

exports.download = function(req, res) {
    res.download('/tmp/' + req.params.downloadId);
};

/**
 * Certificado authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.certificado.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
