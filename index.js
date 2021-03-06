const express = require('express');
const request = require('request');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const rp = require('request-promise');

let app = express();
let port = 4444;

app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: true }));

var options = {
    "async": true,
    "crossDomain": true,
    "url": "https://oak-partnership.co.uk/api/accounts?includeBalances=true",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Key ",
      "Cache-Control": "no-cache",
      "Postman-Token": "a271454e-be61-4193-908f-77cb6b94bb6c"
    },
    "processData": false,  
};


app.get('/', function(req, res) {
	// Render index.mustache -> /index.html
	res.render('index');
});
app.post('/', function(req, res) {
	if (!req.body) return res.sendStatus(400);

	var requestedID = req.body.search;

	rp(options).then(
		function (body) {
			body = JSON.parse(body);

			var arrlen = Object.keys(body);
			var output = {};

			for (i in arrlen) {
				if (body[i].accountCode === requestedID) {
					output = body[i];
					break;
				}
			}
			res.render('index', {response: JSON.stringify(output)});
		}
	).catch(function (err) {
		console.log("API call failed...");
		res.send("API call failed...");
	});
});


app.listen(port, function(){
	console.log("Listening on: \nhttp://localhost:%d", port);
});
