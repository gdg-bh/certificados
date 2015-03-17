'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    phantom = require('phantom'),
    temp = require('temp'),
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
            page.open('http://www.google.com', function(status) {
                console.log('opened google? ', status);
                page.render(tempName);
                page.evaluate(function() {
                    return document.title;
                }, function(result) {
                    console.log('Page title is ' + result);
                    ph.exit();
                });
            });
        });
    });

    var stripfileName = tempName.substring(tempName.lastIndexOf('/') + 1, tempName.length);
    res.jsonp({
        fileName: stripfileName
    });
};

exports.download = function(req, res) {    
    res.download('/tmp/'+req.params.downloadId);
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
