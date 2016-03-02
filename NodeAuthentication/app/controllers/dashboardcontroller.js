var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/Dashboard', function(req, res){
	if(req.mySession && req.mySession.auth){		
		res.locals.user = req.mySession.auth;
		res.render('dashboard/index.jade');
	}
	else{
		res.redirect('/');
	}
});