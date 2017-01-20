var express = require('express');
var router = express.Router();

var users = require('../models/users.js');
var contents  = require('../models/contents.js');

var bodyParser = require('body-parser');
var md5      = require('md5');

// var Session = require('../models/Session.js');

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
router.post('/user', getUser);
router.get('/users', getUsers);
router.post('/user/register', Register);
router.post('/user/auth', Signin);
//router.get('/user/:id', getUser);

router.post('/content/insert', saveDraftContent);
router.post('/content/revert', dropDraftContent);
router.post('/content/update', applyDraftContent);
router.post('/content/drafts', getDrafts);
router.get('/contents', getContents);


function ERROR_MSG(req, res){
	res.end(JSON.stringify({ status: false, error: 'API not found.' }));
}

// function check_user_session(req){
// 	var session = users.fetch_session(req);
// 	console.log(session);
// }

//Get All Users
function getUsers(req, res){
	var user = users.fetch_all(res, function(data){
		res.end(data);
	});
};

//Get specific user
function getUser(req, res){
	users.check_user_session(req, res, function(data){
		var data = JSON.parse(data);
		if(data.status){
			var user = users.fetch(req, res, function(data){
				res.json(JSON.parse(data));
			});
		}
		else {
			res.statusCode = 401;
			res.json({
				status: false,
				message: 'User session has expired'
			});
		}
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
		var user = users.auth(req.body, res, function(data){
			data = JSON.parse(data);
			
			var result;
			if(data.length > 0){
				result = {
					status: true,
					count: data.length,
					data: data
				};
			}
			else {
				result = {
					status: false,
					count: 0,
					data: null
				};
			}

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
		var user = users.register(req.body, res, function(data){
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

function getContents(req, res){
	var content = contents.fetch_all(res, function(data){
		res.json(JSON.parse(data));
	});
}

function getDrafts(req, res){
	var content = contents.fetch_drafts(req.body, res, function(data){
		
		res.json(JSON.parse(data));
	});
}

function saveDraftContent(req, res){		
	users.check_user_session(req, res, function(data){
		var data = JSON.parse(data);
		if(data.status){
			// DO your thingimajiggy here
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
				var content = contents.insertdraft(req.body, res, function(data){
					var result = {
						status: true,
						newValue: req.body.value
					};
					
					res.json(result);
				});		
			}
		}
		else {
			res.statusCode = 401;
			res.json({
				status: false,
				message: 'User session has expired'
			});
		}
	});
	
	return false;
	//console.log(req.body);
	//Validate first
			
}

function dropDraftContent(req, res){
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
		var content = contents.dropchanges(req.body, res, function(data){
			var result = {
				status: true,
				newValue: req.body.value
			};
			
			res.json(result);
		});		
	}
}

function applyDraftContent(req, res){
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
		var content = contents.savechanges(req.body, res, function(data){
			var result = {
				status: true,
				newValue: req.body.value
			};
			
			res.json(result);
		});		
	}
}
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
// 		var user = users.auth(req.body, res, function(result){
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