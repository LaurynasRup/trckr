import { DOMs, months } from '../base';

export const insertFixturesRound = (arr, count) => {
	// if array
	if (arr.length > 0) {
		// Clear innner fixtures container
		DOMs.fixturesRoundCont.innerHTML = '';
		// Grab current obj from fixtures array
		const currentObj = arr[count - 1];
		// Grab round number
		const roundNum = parseInt(currentObj.name.slice(3));
		// Insert round info
		DOMs.fixturesRoundHeader.innerText = `Round ${roundNum}`;
		// Create HTML element to insert for each round
		const daysArray = currentObj.rounds;
		daysArray.forEach((day) => {
			const dayName = modifyDate(day.name);
			const matches = day.matches;
			const matchesArr = [];
			// Create a div
			const matchDayEl = document.createElement('div');
			matchDayEl.classList.add('match-day-el');
			const matchDayHead = document.createElement('h4');
			matchDayHead.classList.add('round-date-head');
			matchDayHead.innerText = dayName;
			matchDayEl.insertAdjacentElement('beforeend', matchDayHead);

			matches.forEach((match) => {
				const matchObj = {};
				matchObj.homeTeam = match.homeTeam;
				matchObj.awayTeam = match.awayTeam;
				matchObj.matchTime = match.date[1].slice(0, 5);
				matchesArr.push(matchObj);
			});
			const matchHtml = matchesArr
				.map((match) => {
					return `<div class="match-info">
				<span class="match-team1">${match.homeTeam}</span>${
						match.matchTime !== '00:00' ? match.matchTime : '--:--'
					}
				<span class="match-team2">${match.awayTeam}</span>
				</div>`;
				})
				.join('');
			matchDayEl.insertAdjacentHTML('beforeend', matchHtml);
			DOMs.fixturesRoundCont.insertAdjacentElement('beforeend', matchDayEl);
		});
	} else {
		// Display Error
		DOMs.fixturesRoundControlCont.innerHtml = '';
		DOMs.fixturesContHeader.innerText = 'No Fixtures Found';
	}
};

// Display dates using words for months
const modifyDate = (str) => {
	// Split date string
	const strArray = str.split('-');
	// convert middle item to integer
	strArray[1] = parseInt(strArray[1]);
	// Replace integer with word
	strArray[1] = months[strArray[1] - 1];
	return strArray.join(' ');
};

// Display different round on pagination button click
export const fixturesRoundPagination = (e, obj) => {
	let newCount = obj.fixturePageCount;
	// If prev btn click
	if (e.target.classList.contains('fa-chevron-left')) {
		// Decrease count
		newCount--;
		// Reassign count to state
		obj.fixturePageCount = newCount;
		// Display arrows && insert fixtures to DOM
		arrowControl(newCount, obj.fixtures);
		insertFixturesRound(obj.fixtures, newCount);
	} else if (e.target.classList.contains('fa-chevron-right')) {
		// Increase count
		newCount++;
		// Reassign count to state
		obj.fixturePageCount = newCount;
		// Display arrows && insert fixtures to DOM
		arrowControl(newCount, obj.fixtures);
		insertFixturesRound(obj.fixtures, newCount);
	}
};

const arrowControl = (count, arr) => {
	// Show both btns
	DOMs.fixturesPrevRoundBtn.className = 'fas fa-chevron-left prev-round';
	DOMs.fixturesNextRoundBtn.className = 'fa fa-chevron-right next-round';
	// Hide prev btn if page is 0
	if (count === 1) {
		DOMs.fixturesPrevRoundBtn.classList.add('hide');
		// Remove next btn if last page
	} else if (count === arr.length) {
		DOMs.fixturesNextRoundBtn.classList.add('hide');
	}
};

export const resetFixturesPagination = (obj) => {
	let newCount = 1;
	obj.fixturePageCount = newCount;
	arrowControl(newCount, obj.fixtures);
	insertFixturesRound(obj.fixtures, newCount);
};
