var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = "http://wiprodigital.com";
var SEARCH_WORD = "eeeemanggt";
var MAX_PAGES_TO_VISIT = 10;
var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
allAbsoluteLinks = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);
crawl();

function crawl() {
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    // We've already visited this page, so repeat the crawl
    crawl();
  } else {
    // New page we haven't visited
    visitPage(nextPage, crawl);
  }
}

function visitPage(url, callback) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;

  // Make the request
  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     // Parse the document body
     var $ = cheerio.load(body);
     collectInternalLinks($);
       // In this short program, our callback is just calling crawl()
     callback();
  });
}


function collectInternalLinks($) {

    /*var relativeLinksType1 = $("a[href^='/']");
    var relativeLinksType2 = $("a[href^='#']");

    console.log("Found " + relativeLinksType1.length + " relative links on page");
    console.log("Found " + relativeLinksType2.length + " relative links on page");

    relativeLinksType1.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
    relativeLinksType2.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });*/

    var absoluteLinks = $("a[href^='http']");

    console.log("Found " + absoluteLinks.length + " absolute links on page");

  	absoluteLinks.each(function() {
  		if($(this).attr('href').match(/wiprodigital.com/)) {
  			pagesToVisit.push($(this).attr('href'));
  		}
  	});
}