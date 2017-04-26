 // Imports the Google Cloud client library
var vision = require('@google-cloud/vision')({
  projectId: "searcharticle-165304",
 
  // The path to your key file: 
  keyFilename: './assets/keyfile.json',
 
  // Or the contents of the key file: 
  credentials: require('./assets/keyfile.json')
});



const util = require('util');



// The name of the image file to annotate
const fileName = 'http://static.ibnlive.com/pix/sitepix/04_2013/sakshi-517-2.jpg';

// Performs label detection on the image file
//console.log(util.inspect(visionClient, {showHidden: false, depth: null}));
//console.log(JSON.stringify(visionClient, null, 4));


// vision.detectFaces(fileName)
//   .then((results) => {

//     const labels = results[0];

//     console.log('Labels:');
//     labels.forEach((label) => console.log(label));
//   });


vision.detectSimilar(fileName)
  .then((data) => {
    const results = data[1].responses[0].webDetection;

    // if (results.fullMatchingImages.length > 0) {
    //   console.log(`Full matches found: ${results.fullMatchingImages.length}`);
    //   results.fullMatchingImages.forEach((image) => {
    //     console.log(`  URL: ${image.url}`);
    //     console.log(`  Score: ${image.score}`);
    //   });
    // }

    // if (results.partialMatchingImages.length > 0) {
    //   console.log(`Partial matches found: ${results.partialMatchingImages.length}`);
    //   results.partialMatchingImages.forEach((image) => {
    //     console.log(`  URL: ${image.url}`);
    //     console.log(`  Score: ${image.score}`);
    //   });
    // }

    if (results.webEntities.length > 0) {
      console.log(`Web entities found: ${results.webEntities.length}`);
      results.webEntities.forEach((webEntity) => {
        console.log(`  Description: ${webEntity.description}`);
        console.log(`  Score: ${webEntity.score}`);
      });
    }
  });