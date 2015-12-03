var http = require('http');

var obj = {
	"name": "Team 4",
	"members": [{"name": "Sam Goormans"}, {"name": "Jonas De Prins"}]
};

var bodyString = JSON.stringify(obj);

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': bodyString.length
};

var options = {
    host: 'hackthefuture.herokuapp.com',
    path: '/dashboard/team',
    port: 80,
    method: 'PUT',
    headers: headers
};


http.request(options).write(bodyString);