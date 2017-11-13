'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var friendSchema = new Schema({
	nombres: {type: String, required: true},
	apellidos: {type: String, required: true	},
	persona: {type: String, required: true},
	created: {type: Date, default: Date.now},
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('friend', friendSchema)
