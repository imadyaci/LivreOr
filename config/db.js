let mysql = require('mysql');
		var connection = mysql.		createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'tutoriel'
		});
connection.connect()
module.exports = connection