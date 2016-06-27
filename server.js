var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var app = express();

// Config app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (isDeveloping) {
  // Add webpack middleware
  var webpack = require('webpack');
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('./webpack.config.js');
  var compiler = webpack(config);
  var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    lazy: false,
    watchOptions: {
      poll: true
    },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/public'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

// Routes
app.get('/hello', function (req, res) {
  res.send('Hello Bok! :D');
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
