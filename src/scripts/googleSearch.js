const request = require('request');

googleSearch = {};


googleSearch.getSearchResults = (searchText, callback) => {

    let searchProp = !!searchText && searchText,
        serviceURL = 'https://www.googleapis.com/customsearch/v1element',
        queryParams = { key: 'AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY', cx: '012148326047351459851:fgzrg0zysrs', q: searchProp };

    request({ url: serviceURL, qs: queryParams }, function(err, response, body) {
        if (err) {
            console.log(err);
            return;
        };

        let data = JSON.parse(body);

        searchResults = !!data && data.results.map((item, key) => {
            let result = {
                'title': item.title,
                'content': item.content,
                'unescapedUrl': item.unescapedUrl

            };
            return result;
        });


        callback(searchResults);
        //console.log(searchResults);
        // !!body && 
    });
};

module.exports = googleSearch;
