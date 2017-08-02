const baseInformationService = require("./service");

const getBaseInformation = (req, res, next) => {
	baseInformationService.getBaseInformation(req.body.username).then(function (params) {
		res.send(JSON.stringify(params));
	});
};

module.exports = {
	getBaseInformation
};