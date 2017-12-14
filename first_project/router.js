function route(handle, pathname, response, request) 
{
	console.log("About to route for " + pathname);
	// check if handlename exists
	if(typeof handle[pathname] === 'function') 
	{
		return handle[pathname](response, request);
	}
	else
	{
		console.log("No request handler found for " + pathname + "\n");
		response.writeHead(404, {"Content-Type":"text/plain"});
		response.write("404 NOT FOUND");
		response.end();
	}
}

exports.route = route;