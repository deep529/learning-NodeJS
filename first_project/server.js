// importing http & url module
var http = require("http");
var url = require("url");

function makeServerWithRequestHandler(route, handle) {
	// function to (send response)/(receive request) from clients
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("-------------------------------------------\nRequest for " + pathname + " received!");
		route(handle, pathname, response, request);
	}

	// a function of http module that creates server and has method named listen, 
	// which takes port no. on which our HTTP server listens 
	http.createServer(onRequest).listen(8888);
	console.log("Server has started!");
}

exports.makeServerWithRequestHandler = makeServerWithRequestHandler;