var express = require('express');
var bodyParser = require('body-parser');
var glob = require('glob');
var path = require('path');
var flash = require('connect-flash');
var session = require('express-session');
var clientsession = require('client-sessions');
var rootPath = path.normalize(__dirname + '/..');

module.exports = function(app) {

	app.set('views', rootPath + '/app/views');
	app.set('view engine','jade');
  app.locals.pretty=true;

  app.use(express.static(rootPath + '/public'));
	app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
   	extended: true
  }));
  app.use(session({ 
    cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false
  }));  
  app.use(clientsession({
    cookieName: 'mySession', // cookie name dictates the key name added to the request object
    secret: 'blargadeeblargblarg', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  }));
  app.use(flash());  

	var controllers = glob.sync(rootPath + '/app/controllers/*.js');	
  	controllers.forEach(function (controller) {  		
    	require(controller)(app);
  	});	
}