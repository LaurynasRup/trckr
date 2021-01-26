import { DOMs, months } from '../base';

// Insert round into the DOM
export const insertScoreRound = (arr, count) => {
	if (arr.length > 0) {
		// Clear inner round container
		DOMs.resultsRoundCont.innerHTML = '';
		// Grab current obj from array
		const currentObj = arr[count];
		// Insert Round info
		DOMs.resultsRoundHeader.innerText = `Round ${count + 1}`;
		// Create an html element to insert for each round
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
				matchObj.score = `${match.score.homeTeam}-${match.score.awayTeam}`;
				matchesArr.push(matchObj);
			});

			const matchHtml = matchesArr
				.map((match) => {
					return `<div class="match-info">
				<span class="match-team1">${match.homeTeam}</span>${match.score}
				<span class="match-team2">${match.awayTeam}</span>
				</div>`;
				})
				.join('');
			matchDayEl.insertAdjacentHTML('beforeend', matchHtml);
			DOMs.resultsRoundCont.insertAdjacentElement('beforeend', matchDayEl);
		});
	} else {
		// Display error message
		DOMs.resultsRoundControlCont.innerHTML = '';
		DOMs.resultsContHeader.innerHTML = 'No Results Found';
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

// Display different rounds on pagination button click
export const scoreRoundPagination = (e, obj) => {
	let newCount = obj.scorePageCount;
	// If prev butn clicked
	if (e.target.classList.contains('fa-chevron-left')) {
		// Decrease count
		newCount--;
		// Reassign count to state
		obj.scorePageCount = newCount;
		// Display arrows && insert Scores to DOm
		arrowControl(newCount, obj.scores);
		insertScoreRound(obj.scores, newCount);
		// If next btn
	} else if (e.target.classList.contains('fa-chevron-right')) {
		// Increase count
		newCount++;
		// Reassign count to state
		obj.scorePageCount = newCount;
		// Display arrows && insert Scores to DOM
		arrowControl(newCount, obj.scores);
		insertScoreRound(obj.scores, newCount);
	}
};

const arrowControl = (count, arr) => {
	// Show both btns
	DOMs.scoresPrevRoundBtn.className = 'fas fa-chevron-left prev-round';
	DOMs.scoresNextRoundBtn.className = 'fa fa-chevron-right next-round';
	// Hide prev btn if page is 0
	if (count === 0) {
		DOMs.scoresPrevRoundBtn.classList.add('hide');
		// Remove next btn if last page
	} else if (count === arr.length - 1) {
		DOMs.scoresNextRoundBtn.classList.add('hide');
	}
};
// Reset score pagination to last page
export const resetScorePagination = async (obj) => {
	let newCount = (await obj.scores.length) - 1;
	obj.scorePageCount = newCount;
	arrowControl(newCount, obj.scores);
	insertScoreRound(obj.scores, newCount);
};
