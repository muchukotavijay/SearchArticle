 // Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Your Google Cloud Platform project ID
const projectId = 'searcharticle-165304';

// Instantiates a client
const visionClient = Vision({
  projectId: projectId
});

// The name of the image file to annotate
const fileName = './assets/donald-trump.jpg';

// Performs label detection on the image file
console.log(visionClient);


visionClient.detectFaces(fileName)
  .then((results) => {

    const labels = results[0];

    console.log('Labels:');
    labels.forEach((label) => console.log(label));
  });