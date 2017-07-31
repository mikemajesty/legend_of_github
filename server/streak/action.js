const streakService = require("./service");

const getScrapStreak = (req, res, next) => {

	const data = streakService.getStreakBody(req.body.username);

	data.then(function (params) {
		console.log('0', params[0])
		console.log('1', params[1])
		console.log('2', params[2])

		console.log('294', params[294])
		console.log('295', params[295])
		console.log('296', params[296])

		res.send(JSON.stringify({ streak: params.length }));
	});
};

module.exports = {
	getScrapStreak
};