const repositoryService = require("./service");

const getRepository = (req, res, next) => {

  repositoryService.getRepository(req.body.username).then((data) =>
    console.log('linguagem', data)
  );

};

module.exports = {
  getRepository
};