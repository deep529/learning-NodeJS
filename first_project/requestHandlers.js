var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function start(response, request) 
{
	console.log("\nin 'START'");
	// html for displaying start page
	var html = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type "'+
		'content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		// form action = /upload meant to redirect to /upload on submitting this form
		'<form action="/upload" enctype="multipart/form-data" method="post"><br>'+
		'<input type="file" name="upload" multiple="multiple"><br>'+
		'<input type="submit" value="Upload PNG image">'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

function upload(response, request) 
{	
	console.log("\nin 'UPLOAD'");	
	// create new incoming form
	var form = new formidable.IncomingForm();
	
	console.log("About to parse");
	// parsing(resolving) incoming request data
	form.parse(request, function (error, fields, files) 
	{
		console.log("Parsing done!");

		// check if proper uploaded file exist 
		if("upload" in files === false || files.upload.size == 0) 
		{
			console.log("Proper image not uploaded");
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("You haven't uploaded anything!");
			response.end();		
		} 
		else 
		{
			// file is stored in /tmp folder
			// relative path from this code directory = ../../../../../../../tmp/"filename"  
			files.upload.path = "../../../../../../.." + files.upload.path;
			
			// we want our filename to be test
			fs.rename(files.upload.path, "../../../../../../../tmp/test", 
					function(error) 
					{
						if(error)
						{
							console.log("ERROR OCCURED while renaming!");
							fs.unlink("../../../../../../../tmp/test");
							fs.rename(files.upload.path, "../../../../../../../tmp/test");
						}
					});

			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("received image:<br/>");
			response.write("<image src='/show' />");
			response.end();
		}
	});
}
	
function show(response, request) 
{
	console.log("\nin 'SHOW'");
	// readfile situated in /tmp with test as name
	fs.readFile("/tmp/test", "binary", function(error, file) 
	{
		if(error)
		{
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write("error"+"\n");
			response.end();
		} 
		else 
		{
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;