const rp = require('request-promise');

const getRepository = (userName) => {
  var options = {
    uri: `https://api.github.com/users/${userName}/repos?page=1&per_page=100`,
    json: true,
    headers: {
      'User-Agent': 'Awesome-Octocat-App'
    }
  };

  return rp(options)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      console.log('error', err);
    });
};

module.exports = {
  getRepository
};