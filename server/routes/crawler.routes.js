var express = require('express');
var crawler = express.Router();

crawler.post('/crawl', function(req, res) {
	let link = req.body.link;
	res.status(200).json({plainText: 'plain text', xmlText: 'xml text', error: false});
})
module.exports=crawler;