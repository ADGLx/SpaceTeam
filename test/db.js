const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: '143.198.41.117',
    user: 'admin',
    password: 'SQLPass1.',
    database: 'default'
});

module.exports = connection;
