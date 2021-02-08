import { strings, DOMs, apiData, leagueCodes } from '../base';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
// fetch data from API, for active league
export const fetchLeagueData = async (activeLeague) => {
	if (activeLeague) {
		// fetch league table data
		const response = await fetch(
			`${apiData.url}/${leagueCodes[activeLeague]}/standings`,
			{
				method: 'GET',
				headers: {
					'X-Auth-Token': apiData.token,
				},
			}
		);
		const data = await response.json();
		// console.log(data);

		// Construct a class item for each league team
		// Grab table data
		const tableData = data.standings[0].table;
		// Init obj to store Team items and Name
		const leagueData = {
			teams: [],
			name: null,
		};
		// Store League Name
		leagueData.name = data.competition.name;
		// Output new Team item to state array
		tableData.forEach((item) => {
			const leagueTeam = new Team(
				item.position,
				item.team.name,
				item.team.crestUrl,
				item.playedGames,
				item.won,
				item.draw,
				item.lost,
				item.goalsFor,
				item.goalsAgainst,
				item.goalDifference,
				item.points,
				item.form
			);
			leagueData.teams.push(leagueTeam);
		});
		// Sort array by position
		leagueData.teams.sort((a, b) => a.position - b.position);

		return leagueData;
	}
};

// Construct a class for each tem in the league
class Team {
	constructor(
		position,
		teamName,
		teamLogo,
		played,
		won,
		draw,
		lost,
		forGoals,
		againstGoals,
		goalDiff,
		points,
		form
	) {
		this.position = position;
		this.teamName = teamName;
		this.teamLogo = teamLogo;
		this.played = played;
		this.won = won;
		this.draw = draw;
		this.lost = lost;
		this.forGoals = forGoals;
		this.againstGoals = againstGoals;
		this.goalDiff = goalDiff;
		this.points = points;
		this.form = form ? form.split(',') : null;
	}
}

// Find liked league
export const findActiveLeague = (obj) => {
	const children = DOMs.savedleaguesInner.children;
	if (children.length > 1) {
		children.forEach((child) => {
			if (child.classList.contains('active')) {
				obj.activeLeague = child.dataset.id;
			}
		});
	} else if (children.length === 1) {
		obj.activeLeague = children[0].dataset.id;
	}
};
