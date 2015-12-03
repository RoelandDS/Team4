var mysql      = require('mysql');
var http	   = require('http');
var connection = mysql.createConnection({
  host     : '173.194.105.180',
  user     : 'student',
  password : 'mulestudent',
  database : 'training'
});

connection.connect();

connection.query('SELECT img_data AS img FROM qr_code WHERE img_title = "[Team 4]"', function(err, rows, fields) {
  if (err) throw err;

  http.createServer(function(req, res) {
  	res.writeHead(200, {"Content-Type": 'image/png'});
  	res.end(rows[0].img);
  }).listen(88);

  console.log("Server running");
  
});

connection.end();