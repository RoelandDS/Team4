var http = require("http");

var obj = {
	"name": "Team 4",
	"members": [{"name": "Sam Goormans"}, {"name": "Jonas De Prins"}]
};


http.createServer(function (req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify(obj));
}).listen(80);


console.log("Server is running");