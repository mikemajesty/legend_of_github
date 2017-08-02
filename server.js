const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const bodyParser = require('body-parser')

app.use('/', express.static(__dirname + '/'));

app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.listen(PORT, function() {
  console.log('Server Running on ' + PORT);
});

process.env.TZ = 'America/Sao_Paulo';

app.use('/', require('./server/api'));