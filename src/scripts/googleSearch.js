'use strict';

const request = require("request");

const googleSearch = {};

googleSearch.getSearchResults = (searchText, callback) => {
	const searchProp = !!searchText && searchText;
	const serviceURL = "https://www.googleapis.com/customsearch/v1element";
	const queryParams = { key: "AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY", cx: "012148326047351459851:6qavvtw72t8", q: searchProp };

/*

%20more%3Athe_telegraph
%20more%3Acourier_mail
%20more%3Aherald_sun
%20more%3Athe_advertiser

*/

	request({ url: serviceURL, qs: queryParams }, (err, response, body) => {
		if (err) {
			console.log(err);
			return;
		}

		const data = JSON.parse(body);

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


		callback(searchResults);
	});
};

module.exports = googleSearch;
