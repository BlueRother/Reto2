'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var personSchema = new Schema({
	nombres: {type: String, required: true},
	apellidos: {type: String, required: true},
	created: {type: Date, default: Date.now},
  friends:[
    {
      nombres: {type: String},
    	apellidos: {type: String},
			ref: {type: Schema.Types.ObjectId, ref: 'friend'},

    }
  ]
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('person', personSchema)
