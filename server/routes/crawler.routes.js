var express = require('express');
var crawler = express.Router();
var crawling = require('../crawler/linkCrawler.js');

crawler.post('/crawl', function(req, res) {
	let link = req.body.link;
	crawling.getCrawlledLink(link, (data) => {
		res.status(200).json({data});
	});
})
module.exports=crawler;