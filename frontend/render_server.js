// https://github.com/markfinger/python-react/blob/master/examples/frontend-rendering-with-webpack/render_server.js
var argv = require('yargs')
  .option('p', {
    alias: 'port',
    description: "Specify the server's port",
    default: 9009
  })
  .option('a', {
    alias: 'address',
    description: "Specify the server's address",
    default: '127.0.0.1'
  })
  .help('h')
  .alias('h', 'help')
  .strict().argv;

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
// var reactRender = require('react-render');

// Ensure support for loading files that contain ES6+7 & JSX
require('@babel/register');

var ADDRESS = argv.address;
var PORT = argv.port;

var app = express();
var server = http.Server(app);
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'chivote_render' });

var render = require('./bundles/server/main.js').default;

app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', function(req, res) {
  res.end('React render server');
});

app.post('/render', function(req, res) {
  const page = req.body.page;
  const props = JSON.parse(req.body.serializedProps);

  log.info('rendering', page, req.body.url);

  const html = render(page, props);

  res.json({
    error: null,
    markup: html
  });
});

server.listen(PORT, ADDRESS, function() {
  log.info('React render server listening at http://' + ADDRESS + ':' + PORT);
});
