'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Certificado Schema
 */
var CertificadoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Certificado name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Certificado', CertificadoSchema);