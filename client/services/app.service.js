import request from 'superagent';

export default {
	crawl(website, cb) {
		crawlWebsite(website, (data) => {
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
      let data = result.data;
      if (!data.error) {
        callback({
          text: data.data,
          error: false
        })
      } else {
        callback({
          text: data.data,
          error: true
        })
      }
  })
}