document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('age-calculator-form');
	const dayInput = document.getElementById('day');
	const monthInput = document.getElementById('month');
	const yearInput = document.getElementById('year');

	const dayError = document.getElementById('day-error');
	const monthError = document.getElementById('month-error');
	const yearError = document.getElementById('year-error');

	const dayGroup = document.getElementById('day-group');
	const monthGroup = document.getElementById('month-group');
	const yearGroup = document.getElementById('year-group');

	const yearsResult = document.getElementById('years');
	const monthsResult = document.getElementById('months');
	const daysResult = document.getElementById('days');

	function validateForm() {
		let isValid = true;
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();

		// Reset error states
		dayGroup.classList.remove('error');
		monthGroup.classList.remove('error');
		yearGroup.classList.remove('error');
		dayError.textContent = '';
		monthError.textContent = '';
		yearError.textContent = '';

		// Validate day
		if (!dayInput.value) {
			dayError.textContent = 'The field is required';
			dayGroup.classList.add('error');
			isValid = false;
		} else if (parseInt(dayInput.value) < 1 || parseInt(dayInput.value) > 31) {
			dayError.textContent = 'Must be a valid day';
			dayGroup.classList.add('error');
			isValid = false;
		}

		// Validate month
		if (!monthInput.value) {
			monthError.textContent = 'The field is required';
			monthGroup.classList.add('error');
			isValid = false;
		} else if (parseInt(monthInput.value) < 1 || parseInt(monthInput.value) > 12) {
			dayError.textContent = 'Must be a valid month';
			monthGroup.classList.add('error');
			isValid = false;
		}

		// Validate year
		if (!yearInput.value) {
			yearError.textContent = 'The field is required';
			yearGroup.classList.add('error');
			isValid = false;
		} else if (parseInt(yearInput.value) > currentYear) {
			yearError.textContent = 'Must be a valid year';
			yearGroup.classList.add('error');
			isValid = false;
		}

		// Validate date is valid (e.g., not 31/04/YYYY)
		if (isValid) {
			const day = parseInt(dayInput.value);
			const month = parseInt(monthInput.value);
			const year = parseInt(yearInput.value);

			const daysInMonth = new Date(year, month, 0).getDate();

			if (day > daysInMonth) {
				dayError.textContent = `Invalid date`;
				dayGroup.classList.add('error');
				monthGroup.classList.add('error');
				yearGroup.classList.add('error');
				isValid = false;
			}

			// Check if date is in the future
			const inputDate = new Date(year, month - 1, day);
			if (inputDate > currentDate) {
				yearError.textContent = 'Must be in the past';
				dayGroup.classList.add('error');
				monthGroup.classList.add('error');
				yearGroup.classList.add('error');
				isValid = false;
			}
		}
		return isValid;
	}

	function calculateAge(birthDate) {
		const today = new Date();
		let years = today.getFullYear() - birthDate.getFullYear();
		let months = today.getMonth() - birthDate.getMonth();
		let days = today.getDay() - birthDate.getDay();

		// Adjust if current day is less than birth day
		if (days < 0) {
			months--;
			const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
			days += lastMonth.getDate();
		}

		// Adjust if current month is less than birth month
		if (months < 0) {
			years--;
			months += 12;
		}

		return { years, months, days };
	}

	// Form submission handler
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		if (validateForm()) {
			const day = parseInt(dayInput.value);
			const month = parseInt(monthInput.value) - 1;
			const year = parseInt(yearInput.value);

			const birthDate = new Date(year, month, day);
			const age = calculateAge(birthDate);

			yearsResult.textContent = age.years;
			monthsResult.textContent = age.months;
			daysResult.textContent = age.days;
		}
	});
});