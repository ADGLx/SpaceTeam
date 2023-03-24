const mysql = require('mysql')

//This connects to the remote db
var db = mysql.createConnection({
    host: '143.198.41.117',
    user: 'admin',
    password: 'SQLPass1.',
    database: 'default'
});

module.exports = db