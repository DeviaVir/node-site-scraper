'use strict';

var request = require('request-promise');
var Promise = require('bluebird');

var endpoint = 'https://frontoffice.paylogic.nl/?event_id=',
    startpoint = 108000,
    urls = [],
    resultUrls = [],
    keyword = 'qlimax';

for(var i = 0 ; i <= 1000 ; i++) {
  urls.push(endpoint + (startpoint + i));
}

Promise.all(urls).each(function(url) {
  return request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
      }
  }).then(function(body) {
    if(body.toLowerCase().indexOf(keyword) > 0) {
      // do something cool
      console.log('FOUND', keyword, '!!!!');
      resultUrls.push(url);
    }
  }).catch(function(err) {
    //console.error('[ERROR]', err);
  });
}).then(function() {
  console.log('results: ', resultUrls);
});
