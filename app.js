var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var data = JSON.parse(fs.readFileSync('./site.json'));
processUrls(data.urlset.url);

function processUrls(data) {
	data.forEach(function(v, i) {
		var options = {
		    url: v.loc,
		    headers: {
		        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
		    }
		};
		request(options, function(err, resp, body) {
	        if (err) {
	        	console.log('Error? ', resp);
	            return console.log(err);
            }

            if(body.indexOf('pebble') > 0) {
            	$ = cheerio.load(body);
            	console.log($('title').text());
	        	return console.log('FOUND!!!!!!!!!! ', options.url);
            }
            else {
        		return false;
        	}
	    });
	});
}