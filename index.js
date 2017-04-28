let imageSearch = require('./src/scripts/imageSearch');

let imagePath = 'http://storage.googleapis.com/gtech-pds-hyd/ShaikAzhar/Nydus_SS//QDZFJTWwPuT.png';

imageSearch.getEntities(imagePath, function(entities) {
    entities.forEach((webEntity) => {
        console.log(`  Description: ${webEntity.description}`);
        console.log(`  Score: ${webEntity.score}`);
    });
});