'use strict';

const express = require('express');
const fs = require('fs');
const util = require('util');
const mime = require('mime');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

let app = express();
// Simple upload form
let form = '<!DOCTYPE HTML><html><body>' +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='image'/>" +
  "<input type='submit' /></form>" +
  '</body></html>';

app.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});

let imageSearch = require('./src/scripts/imagesearch');
let googleSearch = require('./src/scripts/googleSearch');


googleSearch.getSearchResults('North Korea', (whatyouget) => {
    console.log(whatyouget);
});

let imagePath = 'http://wallppr.net/wp-content/uploads/2016/10/Car-4K-Wallpaper-10.jpeg';



// Get the uploaded image
// Image is uploaded to req.file.path
app.post('/upload', upload.single('image'), function(req, res, next) {

  // Choose what the Vision API should detect
  // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  //var types = ['labels'];

  // Send the image to the Cloud Vision API
  
 /* vision.detect(req.file.path, types, function(err, detections, apiResponse) {
    if (err) {
      res.end('Cloud Vision Error');
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('<!DOCTYPE HTML><html><body>');

      // Base64 the image so we can display it on the page
      res.write('<img width=200 src="' + base64Image(req.file.path) + '"><br>');

      // Write out the JSON output of the Vision API
      res.write(JSON.stringify(detections, null, 4));

      // Delete file (optional)
      fs.unlinkSync(req.file.path);

      res.end('</body></html>');
    }
  });
*/

  /*
  imageSearch.getEntities(imagePath, function(entities) {
    entities.forEach((webEntity) => {
        console.log(`  Description: ${webEntity.description}`);
        console.log(`  Score: ${webEntity.score}`);
    });
  });

*/

	res.writeHead(200, {
        'Content-Type': 'text/html'
    });
res.write('<!DOCTYPE HTML><html><body>');
res.write('POST request to the page');
res.write('vision api response');
   // Base64 the image so we can display it on the page
    res.write('<img width=200 src="' + base64Image(req.file.path) + '"><br>');

 
imageSearch.getEntities(req.file.path, function(entities, type) {

	 if(type === 'label'){
        entities.forEach((text) => console.log(text));
     } else if(type === 'webentities'){
        let results = entities;

   /*     if (results.fullMatchingImages.length > 0) {
             console.log(`Full matches found: ${results.fullMatchingImages.length}`);
             results.fullMatchingImages.forEach((image) => {
                 console.log(`  URL: ${image.url}`);
                 console.log(`  Score: ${image.score}`);
             });
         }

         if (results.partialMatchingImages.length > 0) {
             console.log(`Partial matches found: ${results.partialMatchingImages.length}`);
             results.partialMatchingImages.forEach((image) => {
                 console.log(`  URL: ${image.url}`);
                 console.log(`  Score: ${image.score}`);
             });
         }

         */

         if (results.webEntities.length > 0) {
             console.log(`index Web entities found: ${results.webEntities.length}`);
             results.webEntities.forEach((webEntity) => {
                 console.log(`  Description: ${webEntity.description}`);
                 console.log(`  Score: ${webEntity.score}`);
             });
         }
     }
    
  });

res.end('</body></html>');


});


app.listen(8080);
console.log('Server Started');

// Turn image into Base64 so we can display it easily

function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}