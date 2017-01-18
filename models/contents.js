var md5      	= require('md5');
var mysql      = require('mysql');

var db = require('./db.js');

var model = {};

model.fetch_drafts = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT * from contents_drafts where created_by = ?;';

	connection.query(query, [data.user_id], function(err, rows, fields) {
	  	if (err) throw err;

	  	var result = {
			status: false,
			count: 0,
			data: []
		};

		if(rows.length > 0){
			result.status = true;
			result.data = rows;
			result.count = rows.length;
		}
	  	
	  	callback(JSON.stringify(result));
	});

	connection.end();
}

model.fetch_all = function(res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT * from contents where archived = false;';

	connection.query(query, function(err, rows, fields) {
	  	if (err) throw err;

	  	var result = {
			status: false,
			count: 0,
			data: []
		};

		if(rows.length > 0){
			result.status = true;
			result.data = rows;
			result.count = rows.length;
		}
	  	
	  	callback(JSON.stringify(result));
	});

	connection.end();
}

model.insertdraft = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'BEGIN;\
				DELETE FROM contents_drafts where contents_id = ? and created_by = ?;\
				INSERT INTO contents_drafts \
				(\
					contents_id,\
					name,\
					details,\
					created_by\
				)\
				values\
				(\
					?,?,?,?\
				)\
				;\
				COMMIT;';

	connection.query(query, [data.pk, data.user_id, data.pk, data.name, data.value, data.user_id], function(err, rows, fields) {
	  	if (err) throw err;
	  	
	  	callback(JSON.stringify(rows));
	});

	connection.end();
}

model.dropchanges = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'DELETE from contents_drafts \
				where created_by = ?\
				;';

	connection.query(query, [data.user_id], function(err, rows, fields) {
	  	if (err) throw err;
	  	
	  	callback(JSON.stringify(rows));
	});

	connection.end();
}

model.savechanges = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'BEGIN;\
				UPDATE contents\
				LEFT JOIN contents_drafts on contents.id = contents_drafts.contents_id\
				set contents.details = contents_drafts.details\
				where contents_drafts.created_by = ?\
				;\
				DELETE from contents_drafts where created_by = ?;\
				COMMIT;';

	// var query = 'SELECT\
	// 				contents_id,\
	// 				details\
	// 			from contents_drafts \
	// 			where created_by = ?\
	// 			;';

	connection.query(query, [data.user_id, data.user_id], function(err, rows, fields) {
	  	if (err) throw err;
	  	
	  	callback(JSON.stringify(rows));
	});

	connection.end();
}

module.exports = model;