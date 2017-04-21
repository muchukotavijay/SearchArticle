 // Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');
const util = require('util');



// Your Google Cloud Platform project ID
const projectId = 'searcharticle-165304';

// Instantiates a client
const visionClient = Vision({
  projectId: projectId
});

// The name of the image file to annotate
const fileName = './assets/donald-trump.jpg';

// Performs label detection on the image file
//console.log(util.inspect(visionClient, {showHidden: false, depth: null}));
//console.log(JSON.stringify(visionClient, null, 4));


visionClient.detectFaces(fileName)
  .then((results) => {

    const labels = results[0];

    console.log('Labels:');
    labels.forEach((label) => console.log(label));
  });