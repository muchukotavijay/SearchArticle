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

const port = process.env.PORT || 8080; 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
/*
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
*/
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs');

// Turn image into Base64 so we can display it easily

function base64Image(src) {
	const data = fs.readFileSync(src).toString("base64");
	return util.format("data:%s;base64,%s", mime.lookup(src), data);
}

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html')
});


// const imagePath = "http://wallppr.net/wp-content/uploads/2016/10/Car-4K-Wallpaper-10.jpeg";


// Get the uploaded image
// Image is uploaded to req.file.path



app.post("/upload", upload.single("image"), (req, res, next) => {
	
  /*res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write("<!DOCTYPE HTML><html><body>");
	res.write("<h3>POST request to the page / vision api response.</h3>");
  // Base64 the image so we can display it on the page
	res.write(`<img width=200 src="${base64Image(req.file.path)}"><br>`);
*/
	imageSearch.getEntities(req.file.path, (entities, type) => {
		console.log(req.file.path);
		if (type === "label") {
//			entities.forEach(text => console.log(text));
		} else if (type === "webentities") {
			if (entities.webEntities.length > 0) {
				console.log(`index Web entities found: ${entities.webEntities.length}`);
        const visionResults = entities.webEntities.map((webEntity) => {
          const result = {
            score: webEntity.score,
            description: webEntity.description
          };
          return result;
        });

        const searchString = visionResults.map(function(elem){
                                return elem.description;
                            }).join("+");

      res.render('upload', {msg: 'upload', pic: base64Image(req.file.path), visionResults: visionResults, searchString: searchString })
			}
		}
 });

    
	//next();
});

app.get("/results", (req, res) => {
  const searchString = req.query.q || "Noth Korea";
googleSearch.getSearchResults(searchString, (searchResults) => {
  //console.log(searchResults);
   return res.render('results', {msg : "Search Results", searchString: searchString, searchResults: searchResults});
});



});

app.listen(port, () => {
	console.log("Server running on port 8080");
});
