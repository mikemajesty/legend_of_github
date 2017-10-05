var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.json({message: 'Welcome to the Server'})
})

app.listen(8081, () => {
  console.log('API listening on port 8081')
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', require('./api'));
