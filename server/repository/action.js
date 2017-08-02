const repositoryService = require("./service");

const getRepository = (req, res, next) => {
  repositoryService.getRepository(req.body.username).then(function(params) {
    res.send(JSON.stringify(params));
  });
};

module.exports = {
  getRepository
};