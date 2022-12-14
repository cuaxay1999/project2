const mysql = require('mysql')

const connection = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || '12345678',
	database: process.env.DB_NAME || 'bookcar',
	port: process.env.DB_PORT || '3306'
})

module.exports = connection
