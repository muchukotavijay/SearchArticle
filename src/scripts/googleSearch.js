'use strict';

const request = require("request");

const googleSearch = {};

googleSearch.getSearchResults = (searchText, callback) => {
    const searchProp = !!searchText && searchText;
    const serviceURL = "https://www.googleapis.com/customsearch/v1element";
    const queryParams = {
        key: "AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY",
        cx: "012148326047351459851:6qavvtw72t8",
        q: searchProp
    };

    const errorObj = {
        type: 'error'
    };
    /*

    %20more%3Athe_telegraph
    %20more%3Acourier_mail
    %20more%3Aherald_sun
    %20more%3Athe_advertiser

    */

    request({ url: serviceURL, qs: queryParams }, (err, response, body) => {
        if (err) {
            errorObj.key = 'YODA_EMPTY_SEARCH_RESULTS',
                errorObj.value = 'I failed to connect to Google',

                console.log(err);
            callback(errorObj)
            return;
        }

        const data = JSON.parse(body);

        if (!data.results.length) {
            errorObj.key = 'YODA_EMPTY_SEARCH_RESULTS',
                errorObj.value = 'I coucld\'t find results for you! Try with something else !!!',
                callback(errorObj)
            return;
        }

        const searchResults = !!data && data.results.map((item) => {
            const result = {
                title: item.title,
                content: item.content,
                unescapedUrl: item.unescapedUrl,
                image: item.richSnippet && item.richSnippet.cseThumbnail,
                formattedUrl: item.formattedUrl
            };
            return result;
        });


        callback('', searchResults);
    });
};

module.exports = googleSearch;
