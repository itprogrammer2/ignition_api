var express = require('express');
var router = express.Router();

var customers = require('../models/customers.js');

var bodyParser = require('body-parser');
var md5      = require('md5');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//ROUTES

router.get('/', ERROR_MSG);
router.get('/user', ERROR_MSG);
router.get('/users', getUsers);
router.post('/user/register', Register);
router.post('/user/auth', Signin);
router.get('/user/:id', getUser);


function ERROR_MSG(req, res){
	res.end(JSON.stringify({ status: false, error: 'API not found.' }));
}

//Get All Users
function getUsers(req, res){
	var customer = customers.fetch_all(res, function(data){
		res.end(data);
	});
};

//Get specific user
function getUser(req, res){
	var customer = customers.fetch(req, res, function(data){
		res.end(data);
	});
};

//User login
function Signin(req, res){
	//Validate first
	var errors = [];
	for(var i in req.body){
		if(req.body[i].replace(/\s/g,'') == ''){
			errors.push({ field : i, msg : 'Required field.' });
		}
	}
	
	if(errors.length > 0){
		res.send({ status : false, error: errors });
	}
	else {
		var customer = customers.auth(req.body, res, function(data){
			data = JSON.parse(data);
			
			var result = {
				status: true,
				count: data.length,
				data: data
			};

			res.send(result);
		});		
	}
};

function Register(req, res){
	//Validate first
	var errors = [];
	for(var i in req.body){
		if(req.body[i].replace(/\s/g,'') == ''){
			errors.push({ field : i, msg : 'Required field.' });
		}
	}
	
	if(errors.length > 0){
		res.send({ status : false, error: errors });
	}
	else {
		var customer = customers.register(req.body, res, function(data){
			data = JSON.parse(data);
			var result = {
				status: true,
				count: data[0].affectedRows,
				data: {
					user_id: data[0].insertId
				}
			};

			res.end(JSON.stringify(result));
		});		
	}
};

// function getUser(req, res){
// 	//Validate first
// 	req.checkBody('email', 'User not found.').isEmail();
// 	req.checkBody('password', 'Invalid password.').notEmpty();
	
// 	var errors = req.validationErrors();

// 	if(errors){
// 		// let's loop the errors
// 		// to check if we should change
// 		// the appearance of any field

// 		for(var i in errors){
// 			loginclass[errors[i].param].class = 'isEmpty';
// 		}

// 		res.render('signin', {
// 								userdata: req.body,
// 								errors: errors,
// 								loginclass: loginclass
// 							});
// 	}
// 	else {
// 		var customer = customers.auth(req.body, res, function(result){
// 			var result = JSON.parse(result);

// 			if(result.status){
// 				//set session
// 				req.session.profile = result;
// 				//redirect to dashboard
// 				res.redirect('/dashboard/');
// 				//do cookies here
// 			}
// 			else {
// 				req.flash('error_msg', 'Account not found.');
// 				res.render('signin', {
// 								userdata: req.body
// 							});
// 			}
// 			//res.end(data);
			
// 			//
// 		});		
// 	}
// };

module.exports = router;