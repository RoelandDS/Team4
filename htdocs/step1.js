
var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var httpReq = require('http');

// Username voor de HUE API
var username = "389095253ee19e27389f94f12ce78153";

// Index pagina
app.get('/',function(req, res) {
  	res.sendFile(__dirname+'/index.html');
});
// CSS
app.get('/bootstrap.min.css',function(req, res) {
  	res.sendFile(__dirname+'/bootstrap.min.css');
});

// Voor het ophalen van de request variabelen
app.use(bodyParser());

// Post request opvangen
app.post('/light',function(req, res) {
	console.log(req.body);
  	var color = req.body.colorHue;
  	var light = req.body.light;
  	light = 14;

  	var obj;
  	if (typeof req.body.uit !== 'undefined' && req.body.uit != null)
  		obj = {"on":false};
  	else
  		obj = {"on":true, "sat":255, "bri":255,"hue": parseInt(color)};

  	lightFunc(light, color, obj);
  	res.redirect("/");
});

// Functie voor het aanspreken van de lichten
function lightFunc(light, colorHue, obj) {

	
	console.log(JSON.stringify(obj));

	var bodyString = JSON.stringify(obj);

	var headers = {
	    'Content-Type': 'application/json',
	    'Content-Length': bodyString.length
	};

	var options = {
	    host: '10.0.1.3',
	    path: '/api/' + username + '/lights/' + light + '/state',
	    port: 80,
	    method: 'PUT',
	    headers: headers
	};

	httpReq.request(options).write(bodyString);
	

}

http.listen(80);