const repositoryService = require("./service");

const getRepository = (req, res, next) => {

  repositoryService.getRepository(req.body.username).then((data) =>
     res.send(JSON.stringify(data))
  );
};

module.exports = {
  getRepository
};