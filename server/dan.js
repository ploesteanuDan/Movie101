const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'dan',
  password: 'sqlpass23',
  database: 'moviesandproducers',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

con.query('SELECT * FROM movies', (err, res, fields) => {
  if (err) throw err;
  console.log(res);
});

con.end();