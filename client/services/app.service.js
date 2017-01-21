import request from 'superagent';

export default {
	crawl(website, cb) {
		crawlWebsite(website, (data) => {
			console.log(data);
      cb(data);
		});
	}
}

function crawlWebsite (website, callback) {
  let body = {link: website}

  request
    .post('/api/v1/crawl')
    .send(body)
    .end((err, res) => {
      let result = JSON.parse(res.text)
      if (!result.error) {
        callback({
          plainText: result.plainText,
          xmlText: result.xmlText
        })
      } else {
        callback({
          errMessage: result.message
        })
      }
  })
}