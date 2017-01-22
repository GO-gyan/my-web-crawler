var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var pagesToVisit = [];


module.exports = {
	getCrawlledLink(startURL, callback) {
    let pagesToVisit = [];
		let START_URL = 'http://'+startURL;
		let url = new URL(START_URL);
		let baseUrl = url.protocol + "//" + url.hostname;
		pagesToVisit.push(START_URL);

    request(baseUrl, function(error, response, body) {
      if(error) {
        callback({error: true, data: 'url not found'});
        return;
      }else if(response.statusCode !== 200) { // Check status code (200 is HTTP OK)
        callback({error: true, data: 'url not responding'});
        return;
     } else {
      // Parse the document body
      var $ = cheerio.load(body);
      collectInternalLinks($, baseUrl, pagesToVisit, callback);
     }
    });
	}

}

function collectInternalLinks($, baseUrl, pagesToVisit, callback) {

    var relativeLinksType1 = $("a[href^='/']");
    var relativeLinksType2 = $("a[href^='#']");
   // console.log("Found " + relativeLinksType1.length + " relative links on page");
   // console.log("Found " + relativeLinksType2.length + " relative links on page");
   if(relativeLinksType1.length !== 0) {
    relativeLinksType1.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
   }

   if(relativeLinksType2.length !== 0) {
    relativeLinksType2.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
   }
    
    

    var absoluteLinks = $("a[href^='http']");

    //console.log("Found " + absoluteLinks.length + " absolute links on page");
    if(absoluteLinks !== 0) {
      absoluteLinks.each(function() {
      if($(this).attr('href').match(new RegExp(baseUrl, "gi"))) {
        pagesToVisit.push($(this).attr('href'));
      }
    });
  }
    //urlList = Array.from(pagesToVisit);
    callback({error: false, data: pagesToVisit})
}



