const request = require("request");

const googleSearch = {};

googleSearch.getSearchResults = (searchText, callback) => {
	const searchProp = !!searchText && searchText;
	const serviceURL = "https://www.googleapis.com/customsearch/v1element";
	const queryParams = { key: "AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY", cx: "012148326047351459851:fgzrg0zysrs", q: searchProp };

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
				image: item.richSnippet && item.richSnippet.cseThumbnail
			};
			return result;
		});


		callback(searchResults);
        // console.log(searchResults);
        // !!body &&
	});
};

module.exports = googleSearch;
