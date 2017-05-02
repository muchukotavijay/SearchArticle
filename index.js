const express = require("express");

const bodyParser= require('body-parser');

const fs = require("fs");

const util = require("util");

const mime = require("mime");

const multer = require("multer");

const imageSearch = require("./src/scripts/imagesearch");

const googleSearch = require("./src/scripts/googleSearch");

const upload = multer({
	dest: __dirname + "/uploads/"
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

// Turn image into Base64 so we can display it easily

function base64Image(src) {
	const data = fs.readFileSync(src).toString("base64");
	return util.format("data:%s;base64,%s", mime.lookup(src), data);
}

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html')
});

app.get("/results", (req, res) => {
	const searchString = "Noth Korea";
googleSearch.getSearchResults(searchString, (searchResults) => {
   return res.json(searchResults);
});
});


// const imagePath = "http://wallppr.net/wp-content/uploads/2016/10/Car-4K-Wallpaper-10.jpeg";


// Get the uploaded image
// Image is uploaded to req.file.path



app.post("/upload", upload.single("image"), (req, res, next) => {
	
  console.log(JSON.stringify(req.file.path));
  res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write("<!DOCTYPE HTML><html><body>");
	res.write("POST request to the page.");
	res.write("vision api response");
  // Base64 the image so we can display it on the page
	res.write(`<img width=200 src="${base64Image(req.file.path)}"><br>`);

	imageSearch.getEntities(req.file.path, (entities, type) => {
		console.log(req.file.path);
		if (type === "label") {
			entities.forEach(text => console.log(text));
		} else if (type === "webentities") {

      /*     if (entities.fullMatchingImages.length > 0) {
                console.log(`Full matches found: ${entities.fullMatchingImages.length}`);
                entities.fullMatchingImages.forEach((image) => {
                    console.log(`  URL: ${image.url}`);
                    console.log(`  Score: ${image.score}`);
                });
            }

            if (entities.partialMatchingImages.length > 0) {
                console.log(`Partial matches found: ${entities.partialMatchingImages.length}`);
                entities.partialMatchingImages.forEach((image) => {
                    console.log(`  URL: ${image.url}`);
                    console.log(`  Score: ${image.score}`);
                });
            }

            */

			if (entities.webEntities.length > 0) {
				console.log(`index Web entities found: ${entities.webEntities.length}`);
				res.write(entities.webEntities.length);
				entities.webEntities.forEach((webEntity) => {
					console.log(`Description: ${webEntity.description}`);
					console.log(`Score: ${webEntity.score}`);
				});
			}
		}
	});

	next();

	res.end("</body></html>");
});

app.listen(8080, () => {
	console.log("Server running on port 8080");
});
