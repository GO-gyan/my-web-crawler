var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    compression = require('compression');
var main     = express();
var server = require('http').createServer(main);
var port = process.env.PORT || 3000;
var crawler = require('./routes/crawler.routes.js');


main.use(compression());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  main.use(logger('dev'));
  main.use(webpackHotMiddleware(compiler))
  main.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

main.use(express.static(path.join(__dirname, '../client/assets/')));
main.use(express.static(path.join(__dirname, '../client')));

main.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// allow CORS
main.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

main.use('/api/v1/',crawler);

server.listen(port, function() {
    console.log('Express server listening on port '+ server.address().port)
});