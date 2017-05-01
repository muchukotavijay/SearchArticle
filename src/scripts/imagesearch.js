'use strict';

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

     //callback('these entities')

    // Performs text detection on the local file

    vision.detectText(fileName)
    .then((results) => {
        const detections = results[0];
        // console.log('Text:');
        // detections.forEach((text) => console.log(text));
        if(detections.length > 0){
            callback(detections, 'label');    
        }

    }).catch((err) => {
        console.error('ERROR detecting text:', err);
     });

    // Detect similar images on the web to a local file
    vision.detectSimilar(fileName)
     .then((data) => {
         const results = data[1].responses[0].webDetection;
         callback(results,'webentities');
     }).catch((err) => {
        console.error('ERROR detecting similar:', err);
     });

 };

 module.exports = imageSearch;
