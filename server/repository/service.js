const rp = require('request-promise');
const cheerio = require('cheerio');

const getRepository = (userName) => {

  var options = {
    uri: `https://github.com/${userName}?tab=repositories`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  const pagination = rp(options)
    .then(function($) {

      let pagination = [];

      $('div.pagination').each(function(index) {
        $(this).text().match(/\d+/g).forEach((page) => pagination.push(page));
      });
      return pagination;
    })
    .catch(function(err) {
      console.log('error', err);
    });

  const linguagens = [];

  const request = pagination.then(function(pages) {
    const promises = pages.reduce((promiseChain, page) => {

      var options = {
        uri: `https://github.com/${userName}?page=${page}&tab=repositories`,
        transform: function(body) {
          return cheerio.load(body);
        }
      };

      return promiseChain.then(() => rp(options)
        .then(function($) {

          $('li').filter(function(i, el) {
            return $(this).attr('itemprop') === 'owns' && $(this).find('span').text() && !$(this).find('span').text().trim().startsWith('Forked from');
          }).each(function(index) {
            linguagens.push({ name: $(this).find('span').text().replace(/\s/g, '') });
          });
          return linguagens;
        })
        .catch(function(err) {
          console.log('error', err);
        }));

    }, Promise.resolve());

    promises.then(() => linguagens.forEach(data => console.log(`done - ${linguagens.length}` + userName, data)));

    return Promise.resolve(linguagens);
  });

  request.then(data => console.log('data', data));
  return request;
};

module.exports = {
  getRepository
};