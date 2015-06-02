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
var os = require('os');


/**
 * Generate Certificado
 */
exports.create = function(req, res) {
    var csvConverter = new Converter({});
    var archive = new Archiver('zip');
    var file = req.files.file;

    var outputFileName = temp.path({
        suffix: '.zip'
    });

    var output = fs.createWriteStream(outputFileName);
    fs.openSync(outputFileName, 'w');

    var tempName = temp.path({
        suffix: '.pdf'
    });

    //check uploaded .csv file
    fs.readFile(file.path, function(err, original_data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });

    var fileStream = fs.createReadStream(file.path);
    var eventInfo = JSON.parse(req.body.eventInfo);

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
                    orientation: 'landscape',
                    border: '1cm'
                });

                archive.pipe(output);

                var finishZip = _.after(jsonObj.length, function() {
                    archive.finalize();
                    ph.exit();
                });

                var pdfFiles = [];
                _.each(jsonObj, function(attendee) {
                    var tempName = temp.path({
                        suffix: '.pdf'
                    });

                    var templateInfo = {
                        eventInfo: eventInfo,
                        attendee: attendee,
                        url: req.get('host')
                    };

                    var html = swig.renderFile('public/modules/certificados/views/template-certificado.cliente.view.html', templateInfo);
                    page.setContent(html, 'http://gdhbh.com');
                    page.render(tempName, function(error) {
                        if (error) {
                            console.log('Error rendering PDF: %s', error);
                            ph.exit();
                        } else {
                            var pdfFile = fs.createReadStream(tempName);
                            archive.append(pdfFile, {
                                name: attendee.name + '.pdf'
                            });
                            finishZip();
                        }
                    });
                });

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
    var tmpDir = os.tmpdir()
    res.download(tmpDir + req.params.downloadId);
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
