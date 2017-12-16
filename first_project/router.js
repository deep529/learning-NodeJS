var allResponse = require("./allResponse");

function route(handle, pathname, response, request) {
	console.log("About to route for " + pathname);
	// check if handlename exists
	if(typeof handle[pathname] === 'function') {
		return handle[pathname](response, request);
	} else {
		console.log("No request handler found for " + pathname + "\n");
		allResponse.textResponse(response, 404, "ERROR 404 PAGE NOT FOUND");
	}
}

exports.route = route;