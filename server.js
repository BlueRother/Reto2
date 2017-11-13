'use strict'

// REQUERIMIENTO DE MODULOS

var express =  require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//CONFIGURACIONES

// Creación del servidor web con express
var server = express();

// Integracion del motor de templates swig
server.engine('html',swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({cache: false});

// Seteo de dirección de carpeta de archivos estaticos
server.use(express.static(__dirname + '/public'));

// Integración de body parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// CONFIGURACIONES DB

// Integración de mongoose
mongoose.connect('mongodb://localhost/reto', { useMongoClient: true });
mongoose.Promise = global.Promise;

// Requerimiento de modelo person
var Person = require('./models/person');

// Requerimiento de modelo friend
var Friend = require('./models/friend');

// PETICIONES

// Creacion de una instancia mediante valores en url
server.get('/agregar/:nombres/:apellidos/',function(req,res){
	//Obtencion de parametros de url
	var nombres = req.params.nombres;
	var apellidos = req.params.apellidos;
	//Crear una instancia del modelo person
	var person = new Person({ nombres: nombres, apellidos: apéllidos })
	//Guardar instancia del modelo
	person.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			// Redireccion a home
			res.redirect('/');
		}
	});
});

// Cuando exista una petición en el servidor
server.get('/',function(req,res){
	// Consulta al modelo Person en la base de datos.
	Person.find()
	.then( function(personas) {
		res.render('personas.html', {personas:personas});
	})
});

// Creacion de una instancia mediante consulta en url
server.get('/query/',function(req,res){
	//Obtencion de consultas de la url
	var nombres = req.query.nombres;
	var apellidos = req.query.apellidos;
  // Creacion de una instancia mediante valores en url
	var person = new Person({ nombres: nombres, apellidos: apellidos })
  //Guardar instancia del modelo
	person.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			// Redireccion a home
			res.redirect('/');
		}
	});
});

// Petición get del formulario
server.get('/formulario/',function(req,res){
	Person.find()
	.then( function(personas) {
		res.render('formulario.html', {  personas:personas  });
	})
});

// Petición post del formulario
server.post('/formulario/',function(req,res){
	// Regitro de informacion del formulario
	var nombres = req.body.nombres;
	var apellidos = req.body.apellidos;
  var persona =req.body.persona;
	// Creacion de una nueva instancia del modelo friend
	var friend = new Friend({
		nombres: nombres,
		apellidos: apellidos,
    persona: persona,
	});
	// Guardar el amigo creado
  friend.save(function(err){
		// Aseguramiento de no errores
		if( err ){
			console.log(err);
		} else {
			// Busqueda de la persona elegida
			Person.findOne({nombres: persona})
			.then( function(persona) {
				// Registro de nuevo amigo a su persona
				persona.friends.push({
					nombres: friend.nombres,
					apellidos:friend.apellidos,
					ref:friend._id
				});
				// Guardar los cambios hechos en la persona
				persona.save(function(err) {
					// Aseguramiento de no errores
					if( err ){
						console.log(err);
					} else {
						// Redireccion a home
						res.redirect('/');
					}
				})
			})
		}
	})
});


// INICIAR SERVIDOR

// Se corre el servidor en el puerto 8000
server.listen(8000, function() {
	console.log('El servidor esta escuchando en el puerto '+ 8000)
});
