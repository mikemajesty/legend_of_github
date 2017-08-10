const rp = require('request-promise');

const getBaseInformation = (userName) => {
  var options = {
    uri: `https://api.github.com/users/${userName}?client_id=41c55d0365d61511e745&client_secret=7313972ea36b637feee80bce8ef876f41e6f3681'`,
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