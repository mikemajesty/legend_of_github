const streakService = require("./service");

const getScrapStreak = (req, res, next) => {
	//req.body.userName || 
	const data = streakService.getStreakBody(req.body.username);

	data.then(function (params) {
		//console.log('req.body.username: ' + req.body.username , params);

	})
	//console.log('data', data);

	console.log('----------------');
	res.status(200).send("mikemajesty");
	/*.then((data) => res.status(201).json())
    .catch((err) => next(err));*/
};

module.exports = {
	getScrapStreak
};