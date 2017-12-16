function textResponse(response, httpStatusCode, text) {
	response.writeHead(httpStatusCode, {"Content-Type": "text/plain"});
	response.write(text);
	response.end();
}

function htmlResponse(response, httpStatusCode, text) {
	response.writeHead(httpStatusCode, {"Content-Type": "text/html"});
	response.write(text);
	response.end();
}

function imageResponse(response, httpStatusCode, file) {
	response.writeHead(200, {"Content-Type": "image/png"});
	response.write(file, "binary");
	response.end();
}

exports.textResponse = textResponse;
exports.htmlResponse = htmlResponse;
exports.imageResponse = imageResponse;