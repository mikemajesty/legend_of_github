const rp = require('request-promise');

const getBaseInformation = (userName) => {
  var options = {
    uri: `https://api.github.com/users/${userName}`,
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
  getBaseInformation
};