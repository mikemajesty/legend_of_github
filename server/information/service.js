const rp = require('request-promise');
const cheerio = require('cheerio');

const getBaseInformation = (userName) => {

  var options = {
    uri: `https://github.com/${userName}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  const pagination = rp(options)
    .then(function($) {

    })
    .catch(function(err) {
      console.log('error', err);
    });

};

module.exports = {
  getBaseInformation
};