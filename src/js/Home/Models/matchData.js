// Function to fetch scored for the league
import { apiData, leagueCodes } from '../base';

export const fetchScores = async (active, status) => {
	if (active) {
		const response = await fetch(
			`${apiData.url}/${leagueCodes[active]}/matches?status=${status}`,
			{
				method: 'GET',
				headers: {
					'X-Auth-Token': apiData.token,
				},
			}
		);

		const data = await response.json();
		return data.matches;
	}
};
// A class for each Match played
class Match {
	constructor(matchDay, date, homeTeam, awayTeam, score) {
		this.matchDay = 'day' + matchDay;
		this.date = date.split('T');
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.score = score;
	}
}

// Store each match as a constructor class item
export const storeMatches = (arr) => {
	const newArray = [];
	if (arr) {
		arr.forEach((item) => {
			const matchItem = new Match(
				item.matchday,
				item.utcDate,
				item.homeTeam.name,
				item.awayTeam.name,
				item.score.fullTime
			);
			newArray.push(matchItem);
		});
		// Group matches by match day
		return groupByDay(newArray);
	}
};

// Group matches by match day (round)
const groupByDay = (arr) => {
	const newArr = [];
	// Iterate through each item
	arr.forEach((item) => {
		// If arr doesnt contain object with same name as item name
		if (!newArr.some((e) => e.name === item.matchDay)) {
			// cretate new object
			const matchDayObj = {};
			// Init new array
			matchDayObj.matches = [];
			// Set obj.name to item matchday
			matchDayObj.name = item.matchDay;
			// Push item in to the array
			// matchDayObj.matches.push(item);
			// push object into the array
			newArr.push(matchDayObj);
		}
	});
	// Find object with the same match day as match item
	arr.forEach((item) => {
		// Push match item into the array
		const obj = newArr.find((el) => el.name === item.matchDay);
		obj.matches.push(item);
	});
	return groupByRound(groupByDate(newArr));
};

// Group matches by match Date
const groupByDate = (arr) => {
	// Init empty array to store same date matches
	const matchDateArr = [];
	// Iterate through array of objects
	arr.forEach((obj) => {
		obj.matches.forEach((match) => {
			// If matches array doesnt contain a match with same date
			if (!matchDateArr.some((e) => e.name === match.date[0])) {
				// Create new object
				const matchDateObj = {};
				// Init new array
				matchDateObj.matches = [];
				// Set obj name
				matchDateObj.name = match.date[0];
				// Set Round
				matchDateObj.round = match.matchDay;
				//Push match into the array
				// matchDateObj.matches.push(match);
				// push obj into new array
				matchDateArr.push(matchDateObj);
			}
		});
		obj.matches.forEach((match) => {
			const obj = matchDateArr.find((el) => el.name === match.date[0]);
			// Need to check if object doesn not contains the same matches arr !!!!!!!!!!!!
			obj.matches.push(match);
		});
	});
	return matchDateArr;
};

// Group matches by round
const groupByRound = (arr) => {
	const newArray = [];
	// Iterate through each item
	arr.forEach((item) => {
		if (!newArray.some((e) => e.name === item.round)) {
			// New obj
			const roundObj = {};
			// Empty array to store same round obj
			roundObj.rounds = [];
			// Set obj name
			roundObj.name = item.round;
			// Push item to rounds array
			// roundObj.rounds.push(item);
			// Push round Obj into the new array
			newArray.push(roundObj);
		}
	});
	arr.forEach((item) => {
		const obj = newArray.find((el) => el.name === item.round);
		obj.rounds.push(item);
	});
	return newArray;
};
