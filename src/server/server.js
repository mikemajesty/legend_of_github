const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(favicon('./static/img/favicon.ico'));

app.listen(port, () => {
  console.log('API listening on port ' + port);
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', require('./api'));
