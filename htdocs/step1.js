
var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var httpReq = require('http');
var request = require('request');

// Username, host en path voor de HUE API
var username = "389095253ee19e27389f94f12ce78153";
var host = "10.0.1.3";
var path = "/api/" + username + "/lights";


// Index pagina
app.get('/',function(req, res) {
  	res.sendFile(__dirname+'/index.html');
});


// Voor het ophalen van de request variabelen
app.use(bodyParser());

// Get options voor select
app.get('/lights',function(req, res) {
	var selected = req.query.light;
	var options = "";
	request({
		uri: 'http://' + host + path,
		method: "GET" 
	}, 
		function(error, response, body) {

			var obj = JSON.parse(body);

			var options = "";

			for (var light in obj) {

	 			options += '<option value="' + light + '"';
	 			if (light == selected)
	 				options += ' selected';
	 			options += '>' + obj[light]["name"] + '</option>';
	 		}
	 		res.end(options);
	});
	
});


// CSS
app.get('/bootstrap.min.css',function(req, res) {
  	res.sendFile(__dirname+'/bootstrap.min.css');
});
// jQuery
app.get('/jquery.js',function(req, res) {
  	res.sendFile(__dirname+'/jquery.js');
});



// Post request opvangen
app.post('/light',function(req, res) {
  	var color = req.body.colorHue;
  	var light = req.body.light;

  	var obj;
  	if (typeof req.body.uit !== 'undefined' && req.body.uit != null)
  		obj = {"on":false};
  	else
  		obj = {"on":true, "sat":255, "bri":255,"hue": parseInt(color)};

  	lightFunc(light, color, obj);
  	res.redirect("/?light=" + light);
});

// Functie voor het aanspreken van de lichten
function lightFunc(light, colorHue, obj) {


	var bodyString = JSON.stringify(obj);

	var headers = {
	    'Content-Type': 'application/json',
	    'Content-Length': bodyString.length
	};

	var options = {
	    host: host,
	    path: path + '/' + light + '/state',
	    port: 80,
	    method: 'PUT',
	    headers: headers
	};

	httpReq.request(options).write(bodyString);
	

}

http.listen(80);