const rp = require('request-promise');
const cheerio = require('cheerio');

const getStreakBody = (userName) => {
	var options = {
		uri: `https://github.com/users/${userName}/contributions`,
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	return rp(options)
		.then(function ($) {

			let commit = 0;
			let currentStreak = [];

			$('.day').each(function (index) {

				const date = $(this).prop('data-date')
				const commitQuantity = $(this).prop('data-count');

				console.log(`------------------${userName}----------------------`);
				console.log('commit atual: ', commitQuantity);
				console.log('commit anterior: ', commit);
				console.log('date: ', date);

				if (commitQuantity > 0 && commit > 0 || index === 0) {
					currentStreak.push({
						date: date,
						commit: commit
					});
				} else {
					currentStreak = [];
				}

				commit = $(this).prop('data-count');
			});
			
			return currentStreak;
		})
		.catch(function (err) {
			console.log('errror', err);
		});
};

module.exports = {
	getStreakBody
};