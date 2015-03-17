'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    phantom = require('phantom'),
    errorHandler = require('./errors.server.controller'),
    Certificado = mongoose.model('Certificado'),
    _ = require('lodash');

/**
 * Create a Certificado
 */
exports.create = function(req, res) {
    var certificado = new Certificado(req.body);
    //     certificado.user = req.user;

    phantom.create(function(ph) {
        ph.createPage(function(page) {
            page.open("http://www.google.com", function(status) {
                console.log("opened google? ", status);
                page.render("teste.pdf");
                page.evaluate(function() {
                    return document.title;
                }, function(result) {
                    console.log('Page title is ' + result);
                    ph.exit();
                });
            });
        });
    });
    //     phantom.create(function(ph) {
    //         ph.createPage(function(page) {
    //             page.set('paperSize', {
    //                 format: 'A4'
    //             }, function() {
    //                 // continue with page setup
    //             });
    //             page.open('http://www.google.com', function(status) {
    //                 console.log('opened google? ', status);
    //                 // window.setTimeout(function(){
    //                 page.render('file:///tmp/file.pdf');
    //                 console.log('rendered');
    //                 ph.exit();
    //                 // });
    //             });
    //         });
    //     });
    res.download('package.json', '/');
    // certificado.save(function(err) {
    //  if (err) {
    //      return res.status(400).send({
    //          message: errorHandler.getErrorMessage(err)
    //      });
    //  } else {
    //      res.jsonp(certificado);
    //  }
    // });
};

/**
 * Show the current Certificado
 */
exports.read = function(req, res) {
    res.jsonp(req.certificado);
};

/**
 * Update a Certificado
 */
exports.update = function(req, res) {
    var certificado = req.certificado;

    certificado = _.extend(certificado, req.body);

    certificado.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(certificado);
        }
    });
};

/**
 * Delete an Certificado
 */
exports.delete = function(req, res) {
    var certificado = req.certificado;

    certificado.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(certificado);
        }
    });
};

exports.download = function(req,res){
    res.download("teste.pdf");
}

/**
 * List of Certificados
 */
exports.list = function(req, res) {
    Certificado.find().sort('-created').populate('user', 'displayName').exec(function(err, certificados) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(certificados);
        }
    });
};

/**
 * Certificado middleware
 */
exports.certificadoByID = function(req, res, next, id) {
    Certificado.findById(id).populate('user', 'displayName').exec(function(err, certificado) {
        if (err) return next(err);
        if (!certificado) return next(new Error('Failed to load Certificado ' + id));
        req.certificado = certificado;
        next();
    });
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
