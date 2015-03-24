'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var phantom = require('phantom');
var temp = require('temp');
var swig = require('swig');
var errorHandler = require('./errors.server.controller');
var Certificado = mongoose.model('Certificado');
var Converter = require('csvtojson').core.Converter;
var Archiver = require('archiver');
var fs = require('fs');
var _ = require('lodash');

/**
 * Generate Certificado
 */
exports.create = function(req, res) {
    var certificado = new Certificado(req.body);
    var fileStream = fs.createReadStream('teste.csv');
    var csvConverter = new Converter({});
    var archive = new Archiver('zip');
    var outputFileName = temp.path({
        suffix: '.zip'
    });
    var output = fs.createWriteStream(outputFileName);

    csvConverter.on('end_parsed', function(jsonObj) {

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

                archive.pipe(output);

                var pdfFiles = [];
                _.each(jsonObj, function(participante) {
                    var tempName = temp.path({
                        suffix: '.pdf'
                    });
                    var html = swig.renderFile('public/modules/certificados/views/template-certificado.cliente.view.html', participante);
                    page.setContent(html, 'http://gdhbh.com');
                    page.render(tempName, function(error) {
                        if (error) {
                            console.log('Error rendering PDF: %s', error)
                            ph.exit();
                        }
                    });
                    archive.append(fs.createReadStream(tempName), {
                        name: participante.nomeParticipante + '.pdf'
                    });
                });
                archive.finalize();
            });
        });

        output.on('close', function() {
            var stripfileName = outputFileName.substring(outputFileName.lastIndexOf('/') + 1, outputFileName.length);
            res.jsonp({
                fileName: stripfileName
            });
        });

    });

    fileStream.pipe(csvConverter);
};

exports.download = function(req, res) {
    res.download('/tmp/' + req.params.downloadId);
};

exports.uploadCsv = function(req, res) {
    var tempName = temp.path({
        suffix: '.pdf'
    });
    fs.readFile(req.files.displayImage.path, function(err, data) {
        fs.writeFile(tempName, data, function(err) {
            res.jsonp({
                fileName: tempName
            });
        });
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
