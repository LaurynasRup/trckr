export const DOMs = {
	scoresCont: document.querySelector('.scores-cont'),
	fixturesCont: document.querySelector('.fixtures-cont'),
	scoresBtn: document.querySelector('.scores-btn'),
	fixturesBtn: document.querySelector('.fixtures-btn'),
	closeScoresBtn: document.querySelector('.close-btn.left'),
	closeFixtBtn: document.querySelector('.close-btn.right'),
	savedleaguesCont: document.querySelector('.saved-leagues'),
	savedleaguesInner: document.querySelector('.saved-leagues-inner'),
	resultBtn: document.getElementById('scores-btn'),
	fixturesBtn: document.getElementById('fixtures-btn'),
	tableTitle: document.getElementById('league-table-title'),
	tableContainer: document.querySelector('.league-table-cont'),
	resultsRoundHeader: document.getElementById('results-round-head'),
	resultsRoundCont: document.getElementById('results-round-cont'),
	resultsRoundControlCont: document.getElementById('scores-round-control'),
	scoresPrevRoundBtn: document.querySelector(
		'#scores-round-control .prev-round'
	),
	scoresNextRoundBtn: document.querySelector(
		'#scores-round-control .next-round'
	),
	resultsContHeader: document.getElementById('results-cont-header'),
	fixturesRoundCont: document.getElementById('fixtures-round-cont'),
	fixturesRoundHeader: document.getElementById('fixtures-round-header'),
	fixturesRoundControlCont: document.getElementById('fixtures-round-control'),
	fixturesContHeader: document.getElementById('fixtures-cont-header'),
	fixturesPrevRoundBtn: document.querySelector(
		'#fixtures-round-control .prev-round'
	),
	fixturesNextRoundBtn: document.querySelector(
		'#fixtures-round-control .next-round'
	),
};

export const strings = {
	storedLeagueHtml: `<div class="saved-league-card" data-id="RPLC"><img src="img/league_logos/RPLC2.png" alt="league logo"></div>`,
	noLeagues: 'No leagues are added to My Football Trckr',
	tableHead: `<tr class="headings-row">
					<th width="50"></th>
					<th width="200">Team</th>
					<th width="100">Played</th>
					<th width="100">Won</th>
					<th width="100">Draw</th>
					<th width="100">Lost</th>
					<th width="100">For</th>
					<th width="100">Against</th>
					<th width="100">GD</th>
					<th width="100">Points</th>
					<th width="150">Form</th>
				</tr>`,
	winDiv: '<div class="tm-form-el win">W</div>',
	drawDiv: '<div class="tm-form-el draw">D</div>',
	loseDiv: '<div class="tm-form-el lose">L</div>',
	results: 'FINISHED',
	fixtures: 'SCHEDULED',
	loaderHtml: `<div class="spinner">
					<div class="bounce1"></div>
					<div class="bounce2"></div>
					<div class="bounce3"></div>
  				</div>`,
};

export const apiData = {
	url: 'http://api.football-data.org/v2/competitions/',
	token: 'd9e0ae1b7fbe4bcaa2fa45a494f54ad5',
	proxy: 'https://cors-anywhere.herokuapp.com/',
};

export const leagueCodes = {
	premier_league: 'PL',
	bundes_liga: 'BL1',
	brasil_serie_a: 'BSA',
	champions_league: 'CL',
	efl: 'ELC',
	euro_2020: 'EC',
	eredivisie: 'DED',
	france_ligue_1: 'FL1',
	primeira_liga: 'PPL',
	italy_serie_a: 'SA',
};

export const tableClasses = [
	'position',
	'teamName',
	'played',
	'won',
	'draw',
	'lost',
	'forGoals',
	'againstGoals',
	'goalDiff',
	'points',
	'form',
];

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
