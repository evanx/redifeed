
var async = require('async');
var googleapis = require('googleapis');
var request = require('request');

function test() {
   var params = {
      part: 'snippet',
      maxResults: 50,
      order: 'viewCount',
      q: 'liverpool',
      chart: 'mostPopular'
   };
   googleapis.options({auth: exports.config.apiKey});
   var youtube = googleapis.youtube('v3');
   youtube.videos.list(params, (function (err, response) {
      if (err) {
         console.error('error', err);
      } else {
         console.info('response', response);
      }
   }));
}

function start(config) {
   exports.config = config;
   console.info('config', config);
   test();
}

request('http://config:8889/config/youfeed.json', function (err, response, content) {
   if (err) {
      console.error('error', err);
   } else if (response.statusCode !== 200) {
      console.error('statusCode', response.statusCode);

   } else {
      start(JSON.parse(content));
   }
});
