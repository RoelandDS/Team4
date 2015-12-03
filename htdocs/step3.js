var http = require("http");

var obj = {
	"name": "Team 4",
	"members": [{"name": "Sam Goormans"}, {"name": "Jonas De Prins"}]
};


http.createServer(function (req, res) {
	res.writeHead(200, {"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'});
	res.end(JSON.stringify(obj));
}).listen(4000);


console.log("Server is running");