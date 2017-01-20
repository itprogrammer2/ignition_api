var md5      		= require('md5');
var mysql      		= require('mysql');
var crypto 			= require('crypto');

//used to generate customer reference number
var bpay = require('bpay');

var db = require('./db.js');

var model = {};

// model.auth = function(data, res, callback){
// 	var connection = mysql.createConnection(db.credentials);

// 	var query = 'SELECT \
// 					accounts.customers_id  as customer_id, \
// 					accounts.username, \
// 					customers.business_name, \
// 					customers.nature_of_business, \
// 					customers.contact_person, \
// 					customers.email_address \
// 				from accounts \
// 				left join customers on (accounts.customers_id = customers.id) \
// 				where username = ? and password = ?;';

// 	connection.query(query, [data.username, md5(data.password)], function(err, rows, fields) {
// 	  	if (err) throw err;
// 	  	var result = JSON.stringify(rows);
// 	  	callback(result);
// 	});

// 	connection.end();
// }

model.check_user_session = function(req , res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT \
					*\
				from users_sessions \
				where auth_token = ? and expiration_date > CURRENT_TIMESTAMP;';

	connection.query(query, [req.body.auth_token], function(err, rows, fields) {
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

model.auth = function(data, res, callback){
	// var datenow = new Date();
	// var y = datenow.getFullYear();
	// var M = datenow.getMonth() + 1;
	// var d = datenow.getDate();
	// var h = datenow.getHours();
	// var m = datenow.getMinutes();
	// var s = datenow.getSeconds();
	// var ss = datenow.getMilliseconds();

	// var text1, text2;
 //    var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";

 //    for( var i=0; i < 100; i++ )
 //        text1 += possible.charAt(Math.floor(Math.random() * possible.length));

 //    for( var i=0; i < 100; i++ )
 //        text2 += possible.charAt(Math.floor(Math.random() * possible.length));

	// var name1 = y+M+d+h+m+s+ss + text1;
	// var name2 = y+M+d+h+m+s+ss + text2;

	// var code1 = crypto.createHash('md5').update(name1).digest('hex');
	// var code2 = crypto.createHash('md5').update(name2).digest('hex');
	// console.log(code1);
	// console.log(code2);

	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT \
					accounts.profile_id  as profile_id, \
					accounts.username, \
					profile.first_name, \
					profile.middle_name, \
					profile.last_name \
				from accounts \
				left join profile on (accounts.profile_id = profile.id) \
				where username = ? and password = ?;';

	connection.query(query, [data.email, md5(data.password)], function(err, rows, fields) {
	  	if (err) throw err;

	  	//a user has been found
	  	if(rows.length > 0){
	  		var token = crypto.randomBytes(64).toString('hex');

	  		var session = 'BEGIN;\
	  						DELETE from users_sessions where profile_id = ?;\
	  						INSERT into users_sessions\
	  						(\
	  							profile_id,\
	  							auth_token,\
	  							expiration_date\
	  						)\
	  						values\
	  						(\
	  							?,?,?\
	  						);\
	  						COMMIT;';

	  		var now = new Date();
	  		var y = now.getFullYear();
	  		var M = now.getMonth() + 1;
	  		var d = now.getDate();
	  		var h = now.getHours();
	  		var m = now.getMinutes();
	  		var s = now.getSeconds();

	  		if(data.stay_signin == 'true'){
	  			d++;
	  		}
	  		else {
	  			h+=2;
	  		}

	  		//add leading zero to month and day
	  		M = '0' + M;
	  		d = '0' + d;
	  		h = '0' + h;
	  		m = '0' + m;
	  		s = '0' + s;

	  		var expiration_date = 	y +'-'+ 
	  								M.slice(-2) +'-'+ 
	  								d.slice(-2) +' '+ 
	  								h.slice(-2) +':'+ 
	  								m.slice(-2) +':'+ 
	  								s.slice(-2);

	  		var user = JSON.parse(JSON.stringify(rows));

	  		user[0].auth_token =  md5(token);
	  		user[0].auth_token_expiration = expiration_date;
	  		
	  		connection.query(session, [user[0].profile_id, user[0].profile_id, md5(token), expiration_date], function(err, rows, fields) {
	  			if (err) throw err;

	  			callback(JSON.stringify(user));
	  		});

	  		connection.end();
	  	}
	});

	
}

model.fetch_all = function(res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT \
					accounts.profile_id  as profile_id, \
					accounts.username, \
					profile.first_name, \
					profile.middle_name, \
					profile.last_name \
				from accounts \
				left join profile on (accounts.profile_id = profile.id) \
				;';

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

model.fetch = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT \
					profile.id as profile_id, \
					profile.hash_id, \
					profile.first_name, \
					profile.middle_name, \
					profile.last_name \
				from profile \
				where profile.id = ?;';

	connection.query(query, data.body.profile_id, function(err, rows, fields) {
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

model.register = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'insert into customers \
				( \
					reference_number, \
					business_name, \
					nature_of_business, \
					contact_person, \
					email_address \
				) \
				values \
				( \
					?, ?, ?, ?, ?\
				); SELECT LAST_INSERT_ID() as user_id;';

	//We are not going to rely on bpay alone. bpay is numeric only,
	//we'll prepend 2 strings using the randomizer below
	//we removed O and I because it may be confusing to look at
	var text = "";
    var possible = "ABCDEFGHJKLMNPQRSTUVWXYZ";

    for( var i=0; i < 2; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

	var values = [
		text+bpay.generateBpayCRN(8),
		data.name_of_business,
		data.nature_of_business,
		data.contact_person,
		data.email_address
	];

	connection.query(query, values, function(err, rows, fields) {
	  	if (err) throw err;
	  	
	  	var result = JSON.stringify(rows);
	  	callback(result);
	});

	connection.end();
}

model.save_interests = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var interests = data.interests.split(',');
	var customer_id = data.customer_id;
	
	var values = [];
	var query="begin;";
	for(var i in interests){
		query += 'insert into customers_interests \
					( \
						customers_id, \
						interest \
					) \
					values \
					( \
						?, \
						? \
					); \
					\
				';

		values.push(customer_id);
		values.push(interests[i]);
	}

	query += 'commit;';

	connection.query(query, values, function(err, rows, fields) {
	  	if (err) throw err;
	  	var result = JSON.stringify(rows);
	  	callback(result);
	});

	connection.end();
}

module.exports = model;