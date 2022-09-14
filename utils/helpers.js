module.exports = {
	//A reusable function to adjust the dates stored in the datbase to a readable format.
	fixDate: (date) => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		return new Date(date).toLocaleDateString('us-en', options);
	},
	//Adjusts the date to a readable format without the time
	noTime: (date) => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		return new Date(date).toLocaleDateString('us-en', options);
	},
};
