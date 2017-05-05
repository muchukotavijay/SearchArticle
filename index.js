'use strict';

const express = require("express");

const bodyParser = require("body-parser");

const fs = require("fs");
const AWS = require('aws-sdk');

const util = require("util");

const mime = require("mime");

const multer = require("multer");
const multerS3 = require('multer-s3');

const imageSearch = require("./src/scripts/imagesearch");

const googleSearch = require("./src/scripts/googleSearch");


AWS.config.update({
    accessKeyId: 'AKIAI53DP4RGYCEOSOTQ',
    secretAccessKey: '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',
    region: 'us-east-1'
});
var s3 = new AWS.S3();


var resizedBucket = 'newsfoundry';
var imageKey = 'uploaded_pic.jpg';

const upload = multer({
	storage:multerS3({
		s3:s3,
		bucket: resizedBucket,
		key: function (req, file, cb) {
      cb(null, imageKey)
    },
		acl: 'public-read',
		contentType: function(req, file, cb){
			cb(null, 'image/jpeg')	
		}
	})
});

const app = express();

const port = process.env.PORT || 8080;





app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
/*
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
*/
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs");

// Turn image into Base64 so we can display it easily

function base64Image(src) {
	//console.log(src);
	const data = fs.readFileSync(src).toString("base64");
	return util.format("data:%s;base64,%s", mime.lookup(src), data);
}

function fileSizeInKBs(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    const fileSizeInKBs = fileSizeInBytes / 1000.0;
    return fileSizeInKBs
}

app.get("/", (req, res) => {
	res.render(__dirname + "/views/index.ejs");
});


// const imagePath = "http://wallppr.net/wp-content/uploads/2016/10/Car-4K-Wallpaper-10.jpeg";


// Get the uploaded image
// Image is uploaded to req.file.path

app.post("/upload", upload.single("pickimg"), (req, res, next) => {

	var imageUrl = 'https://s3.amazonaws.com/'+resizedBucket+'/'+imageKey;
	


	imageSearch.getEntities(imageUrl, (entities, type) => {
		//console.log(req.file.path);
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

				const googleSearchString = visionResults[0].description;

				googleSearch.getSearchResults(googleSearchString, (searchResults) => {
			        res.render("upload", { msg: "upload", pic: imageUrl, visionResults, googleSearchString, searchResults });
			    });
			}
		}
	});
    // next();
});

app.get("/results", (req, res) => {
	const searchString = req.query.q || "Noth Korea";
	googleSearch.getSearchResults(searchString, searchResults =>
        // console.log(searchResults);
         res.render("results", { msg: "Search Results", searchString, searchResults }));
});

app.listen(port, () => {
	console.log("Server running on port 8080");
});
