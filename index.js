let imageSearch = require('./src/scripts/imageSearch');

let imagePath = 'https://lh3.googleusercontent.com/-c44dxtQGUxE/AAAAAAAAAAI/AAAAAAAACTY/nxZSUuRWT00/s0-c-k-no-ns/photo.jpg';

imageSearch.getEntities(imagePath, function(entities) {
    entities.forEach((webEntity) => {
        console.log(`  Description: ${webEntity.description}`);
        console.log(`  Score: ${webEntity.score}`);
    });
});
