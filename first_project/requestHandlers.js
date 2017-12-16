var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable"),
	allResponse = require("./allResponse");

function start(response, request) {
	console.log("\nin 'START'");
	// reading html file for displaying start page
	var html = fs.readFileSync("./start.html", "utf-8");
	allResponse.htmlResponse(response, 200, html);
	console.log("exited 'START'");
}

function upload(response, request) {	
	console.log("\nin 'UPLOAD'");	
	// create new incoming form
	var form = new formidable.IncomingForm();
	
	console.log("About to parse");
	// parsing(resolving) incoming request data
	form.parse(request, function (error, fields, files) {
		console.log("Parsing done!");
		
		// check if proper file uploaded 
		if("upload" in files === false || files.upload.size === 0 || (files.upload.type !== "image/png" && files.upload.type !== "image/jpg" && files.upload.type !== "image/jpeg" && files.upload.type !== "image/gif")) {
			console.log("Nothing uploaded or Proper image not uploaded");
			allResponse.textResponse(response, 200, "Error: Either invalid file or nothing was uploaded!");
		} else {
			// file is stored in /tmp folder
			// relative path from this code directory = ../../../../../../../../tmp/"filename"  
			files.upload.path = "../../../../../../../.." + files.upload.path;
			
			// we want our filename to be test
			fs.rename(files.upload.path, "../../../../../../../../tmp/test", function(error) {
				if(error) {
					console.log("ERROR OCCURED while renaming!");
					fs.unlink("../../../../../../../../tmp/test");
					fs.rename(files.upload.path, "../../../../../../../../tmp/test");
				}
			});

			allResponse.htmlResponse(response, 200, "received image:<br/>\n<image src='/show'/>");
		}
	});
	console.log("exited 'UPLOAD'");
}
	
function show(response, request) {
	console.log("\nin 'SHOW'");
	// readfile situated in /tmp with test as name
	fs.readFile("/tmp/test", "binary", function(error, file) {
		if(error) {
			allResponse.textResponse(response, 500, "ERROR in displaying image!");
		} else {
			allResponse.imageResponse(response, 200, file);
		}
	});
	console.log("exited 'SHOW'");
}

exports.start = start;
exports.upload = upload;
exports.show = show;