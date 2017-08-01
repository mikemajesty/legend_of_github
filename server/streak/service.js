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

			const currentDateStreak = [];
			let currentStreak = [];

			$('.day').each(function (index) {

				const date = new Date($(this).prop('data-date'));
				date.setHours(0, 0, 0, 0);

				if (currentDateStreak[index - 1]) {
					const tempDate = currentDateStreak[index - 1].date;
					tempDate.setDate(tempDate.getDate() + 1);
					tempDate.setHours(0, 0, 0, 0);

					if (date.getTime() === tempDate.getTime()) {
						currentStreak.push({
							date: date,
							commit: $(this).prop('data-count')
						});
					} else {
						currentStreak = [];
					}
				}
				currentDateStreak.push({
					date: date
				});
			});

			return currentStreak;
		})
		.catch((err) => {
			console.log('error', err);
		});
};

module.exports = {
	getStreakBody
};