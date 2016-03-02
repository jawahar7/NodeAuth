var express = require('express');
var glob = require('glob');
var path = require('path');
var mongoose = require('mongoose');
var rootPath = path.normalize(__dirname + '/..');
var app = express();

mongoose.connect('mongodb://localhost/newauth',function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('connect');
	}
})

var models = glob.sync('app/models/*.js');
models.forEach(function (model) {	
  	require('./' + model);
});

require('./config/configexpress')(app);

app.listen(3000);