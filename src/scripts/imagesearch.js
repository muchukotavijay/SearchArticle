'use strict';

const vision = require("@google-cloud/vision")({
    projectId: "searcharticle-165304",
    // The path to your key file:
    keyFilename: "./config/keyfile.json"
});

// const util = require("util");

const imageSearch = {};
const errorObj = {
    type: 'error'
};

imageSearch.getEntities = (filePath, callback) => {
    // The name of the image file to annotate
    const fileName = filePath;

    // callback('these entities')

    // Performs text detection on the local file

    vision.detectText(fileName)
        .then((results) => {

            if (!results) {
                errorObj.key = 'YODA_EMPTY_RESULTS_DETECT_TEXT',
                    errorObj.value = 'Yoda couldn\'t find any Results for your image',
                    callback(errorObj);
                return;
            }

            const detections = results[0];
            // console.log('Text:');
            // detections.forEach((text) => console.log(text));
            if (detections.length > 0) {
                callback('', detections, "label");
            }
        }).catch((err) => {
            	errorObj.key = 'YODA_EMPTY_RESULTS_DETECT_TEXT',
                errorObj.value = 'Yoda gave up',
                callback(errorObj);
            console.error("ERROR detecting text:", err);
        });

    // Detect similar images on the web to a local file
    vision.detectSimilar(fileName)
        .then((data) => {

            if (!data) {
                errorObj.key = 'YODA_EMPTY_RESULTS_DETECT_SIMILAR',
                errorObj.value = 'Yoda couldn\'t find any Results'
                callback(errorObj);
                return;
            }


            const results = data[1].responses[0].webDetection;
            callback('', results, "webentities");
        }).catch((err) => {
        	errorObj.key = 'YODA_EMPTY_RESULTS_DETECT_SIMILAR',
            errorObj.value = 'Yoda gave up',
            callback(errorObj);
            console.error("ERROR detecting similar:", err);
        });
};

module.exports = imageSearch;
