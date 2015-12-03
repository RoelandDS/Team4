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

var callback = function(response) {
var str = JSON.stringify(obj);

//another chunk of data has been recieved, so append it to `str`
response.on('data', function(chunk) {
str += chunk;
});

//the whole response has been recieved, so we just print it out here
response.on('end', function() {
console.log(str);
});
};

// https://hackthefuture.herokuapp.com/dashboard/team

http.request(options, callback).write(bodyString);