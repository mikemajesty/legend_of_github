const rp = require('request-promise');
const cheerio = require('cheerio');

const getBaseInformation = (userName) => {

  var options = {
    uri: `https://github.com/${userName}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  return rp(options)
    .then(function($) {
      console.log('entrou', userName);
      const arrayInformation = [];

      $("span.Counter").each(function(index, data) {
        arrayInformation[index] = parseInt($(data).text().trim().replace(/\n|\r/g, ""));
      });

      const organizations = $('div.border-top.py-3.clearfix').find('a').length;

      const commits = $("h2.f4.text-normal.mb-2").text().trim().match(/\d+,?\d+/g);

      return  {
        stars: arrayInformation[1],
        fallowers: arrayInformation[2],
        fallowing: arrayInformation[3],
        commits: commits ? parseInt(commits[0].replace(",", "").replace(".", "")) : 0,
        organizations: organizations
      };

    })
    .catch(function(err) {
      console.log('error', err);
    });
};

module.exports = {
  getBaseInformation
};