 // Imports the Google Cloud client library
 let vision = require('@google-cloud/vision')({
     projectId: "searcharticle-165304",

     // The path to your key file: 
     keyFilename: '../config/keyfile.json',

     // Or the contents of the key file: 
     credentials: require('../config/keyfile.json')
 });


 const util = require('util');


 let imageSearch = {};

 imageSearch.getEntities = (filePath, callback) => {
     // The name of the image file to annotate
     let fileName = filePath || './assets/somegirl.jpeg';

     // Performs label detection on the image file
     //console.log(util.inspect(visionClient, {showHidden: false, depth: null}));
     //console.log(JSON.stringify(visionClient, null, 4));



    // Find crop hints for the local file
    // vision.detectCrops(fileName)
    // .then((data) => {
    //     const cropHints = data[0];

    //     cropHints.forEach((hintBounds, hintIdx) => {
    //         console.log(`Crop Hint ${hintIdx}:`);
    //         hintBounds.forEach((bound, boundIdx) => {
    //             console.log(`  Bound ${boundIdx}: (${bound.x}, ${bound.y})`);
    //         });
    //     });
    // });



    // Read a local image as a text document
    // vision.readDocument(fileName)
    // .then((data) => {
    //     const results = data[1].responses[0].fullTextAnnotation;
    //     console.log(results.text);
    // });



    // detect faces

    // vision.detectFaces(fileName)
    // .then((results) => {
    //     const faces = results[0];

    //     console.log('Faces:');
    //     faces.forEach((face, i) => {
    //         console.log(`  Face #${i + 1}:`);
    //         console.log(`    Joy: ${face.joy}`);
    //         console.log(`    Anger: ${face.anger}`);
    //         console.log(`    Sorrow: ${face.sorrow}`);
    //         console.log(`    Surprise: ${face.surprise}`);
    //     });
    // });




    // Performs image property detection on the local file
    // vision.detectProperties(fileName)
    // .then((results) => {
    //     const properties = results[0];

    //     console.log('Colors:');
    //     properties.colors.forEach((color) => console.log(color));
    // });


    // Performs label detection on the local file
    // vision.detectLabels(fileName)
    //    .then((results) => {
    //        const labels = results[0];

    //        console.log('Labels:');
    //        labels.forEach((label) => console.log(label));
    // });

    // Performs landmark detection on the local file
    // vision.detectLandmarks(fileName)
    //    .then((results) => {
    //        const landmarks = results[0];

    //        console.log('Landmarks:');
    //        landmarks.forEach((landmark) => console.log(landmark));
    // });


    // Performs logo detection on the local file
    // vision.detectLogos(fileName)
    // .then((results) => {
    //     const logos = results[0];

    //     console.log('Logos:');
    //     logos.forEach((logo) => console.log(logo));
    // });

    // Performs safe search property detection on the local file
    // vision.detectSafeSearch(fileName)
    // .then((results) => {
    //     const detections = results[0];

    //     console.log(`Adult: ${detections.adult}`);
    //     console.log(`Spoof: ${detections.spoof}`);
    //     console.log(`Medical: ${detections.medical}`);
    //     console.log(`Violence: ${detections.violence}`);
    // });


    // Performs text detection on the local file

    vision.detectText(fileName)
    .then((results) => {
        const detections = results[0];
        console.log('Text:');
        detections.forEach((text) => console.log(text));
    });

    // Detect similar images on the web to a local file
    vision.detectSimilar(fileName)
     .then((data) => {
         const results = data[1].responses[0].webDetection;

         if (results.fullMatchingImages.length > 0) {
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

         if (results.webEntities.length > 0) {
             console.log(`Web entities found: ${results.webEntities.length}`);
             results.webEntities.forEach((webEntity) => {
                 console.log(`  Description: ${webEntity.description}`);
                 console.log(`  Score: ${webEntity.score}`);
             });
         }
     });




     // vision.detectSimilar(fileName)
     //     .then((data) => {
     //         let results = data[1].responses[0].webDetection;

     //         if (results.fullMatchingImages.length > 0) {
     //           console.log(`Full matches found: ${results.fullMatchingImages.length}`);
     //           results.fullMatchingImages.forEach((image) => {
     //             console.log(`  URL: ${image.url}`);
     //             console.log(`  Score: ${image.score}`);
     //           });
     //         }

     //         if (results.partialMatchingImages.length > 0) {
     //           console.log(`Partial matches found: ${results.partialMatchingImages.length}`);
     //           results.partialMatchingImages.forEach((image) => {
     //             console.log(`  URL: ${image.url}`);
     //             console.log(`  Score: ${image.score}`);
     //           });
     //         }

     //         if (results.webEntities.length > 0) {
     //             console.log(`Web entities found: ${results.webEntities.length}`);
     //             results.webEntities.forEach((webEntity) => {
     //                 console.log(`  Description: ${webEntity.description}`);
     //                 console.log(`  Score: ${webEntity.score}`);
     //             });

     //             callback(results.webEntities);
     //         }
     //     });
 };

 module.exports = imageSearch;
