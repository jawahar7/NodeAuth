var express = require('express');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var bcrypt = require('bcrypt');
var router = express.Router();
var Register = mongoose.model('Register');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function(req, res){
	res.render('login/login.jade', { errmsg: req.flash('error') ,succmsg: req.flash('success')});
});

router.post('/', function(req, res){	
	Register.findOne({username:req.body.username}, function(err, result){
		if(result){
			if(bcrypt.compareSync(req.body.password, result.password)){
				req.mySession.auth = result;
				res.redirect('/Dashboard');
			}
			else{
				req.flash('error','Invalid Credential');
				res.redirect('/');
			}
		}
		else{
			req.flash('error','Invalid Credential');
			res.redirect('/');
		}
	});
});

router.get('/Register', function(req, res){			
	res.render('login/register.jade', { errmsg: req.flash('error') ,succmsg: req.flash('success')});
});

router.post('/Register', function(req, res){
	var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	var register = new Register({
		username: req.body.username,
		password: hash
	});
	register.save(function(err){
		if(err) {
			if(err.code == 11000){
				req.flash('error','Username Already Exists');
			}			
			else{
				req.flash('error','Try After Some Time');
			}		
			res.redirect('/Register');	
		}
		else{
			req.flash('success','Register Successfully');
			res.redirect('/');
		}				
	});	
});