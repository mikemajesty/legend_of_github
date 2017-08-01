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

				const commit = $(this).prop('data-count');

				if (currentDateStreak[index - 1]) {
					const tempDate = currentDateStreak[index - 1].date;
					tempDate.setDate(tempDate.getDate() + 1);
					tempDate.setHours(0, 0, 0, 0);

					if (commit > 0 && date.getTime() === tempDate.getTime()) {
						currentStreak.push({
							date: date,
							commit: commit
						});
					} else {
						if(index < ($('.day').length -1)){
							currentStreak = [];
						}
					}
				}

				currentDateStreak.push({
					date: date
				});
				
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