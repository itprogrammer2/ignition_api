var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var api = require('./routes/api');

var morgan       = require('morgan');

//Initialize Ignition API
var app = express();

app.disable('x-powered-by');

//app.use(morgan('dev')); // log every request to the console

//Middleware - BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

//Set Port
app.set('port', (process.env.PORT || 9001));
							
//Initialize App
app.listen(app.get('port'), function(){
	console.log('Ignition Website started on port ' + app.get('port'));
});