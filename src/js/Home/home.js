import { DOMs, strings } from './base';
import * as dbConnect from './Models/dbConnect';
import * as leaguesView from './View/leaguesView';
import * as leaguesData from './Models/leaguesData';
import * as tableView from './View/tableView';
import * as matchData from './Models/matchData';
import * as scoresView from './View/scoresView';
import * as fixturesView from './View/fixturesView';

const state = {
	leagueData: {
		leagues: [],
		name: null,
		scores: [],
	},
};

const homeControl = async () => {
	// Event listeners
	initEventListeners();
	// Retrieve logged in user email
	const userEmail = JSON.parse(sessionStorage.getItem('loggedInUser'));
	// Retrieve liked leagues data from DB
	const likedLeaguesData = await dbConnect.fetchData(userEmail);
	// store liked leagues to state
	state.likedLeagues = JSON.parse(likedLeaguesData);
	// Insert liked leagues into the DOM
	leaguesView.insertLeaguesDOM(state.likedLeagues);
	// Store and insert current active league
	insertActiveLeague(state);
	// Scores Control
	scoresControl();
	// Fixtures control
	fixturesControl();
};

// Scores Control
const scoresControl = async () => {
	// Fetch scores data for displayed league
	const scoreMatches = await matchData.fetchScores(
		state.activeLeague,
		strings.results
	);
	if (scoreMatches) {
		// Store previous matches (grouped by match day) in array
		state.scores = matchData.storeMatches(scoreMatches);
		// Create a count for score pagination
		state.scorePageCount = state.scores.length - 1;
		// Insert scores data in to the DOM
		scoresView.insertScoreRound(state.scores, state.scorePageCount);
	}
};

// Fixtures Control
const fixturesControl = async () => {
	// Fetch fixtures data
	const fixturesData = await matchData.fetchScores(
		state.activeLeague,
		strings.fixtures
	);
	if (fixturesData) {
		// Store fixtures data in state
		state.fixtures = matchData.storeMatches(fixturesData);
		// Set a current count for fixtures pages
		state.fixturePageCount = 1;
		// Insert fixtures data in to the DOM
		fixturesView.insertFixturesRound(state.fixtures, state.fixturePageCount);
	}
};

// Function to check for active league and insert into DOM
const insertActiveLeague = async (obj) => {
	// Insert spinner
	DOMs.tableContainer.innerHTML = strings.loaderHtml;
	// Find Active League
	leaguesData.findActiveLeague(obj);
	// Fetch league data from API
	obj.leagueData = await leaguesData.fetchLeagueData(obj.activeLeague);
	// insert league table to DOM
	if (obj.leagueData) {
		tableView.insertTable(obj.leagueData, obj.activeLeague);
	} else {
		// Update container view
		leaguesView.mainContView(state.likedLeagues);
		// Remove spinner
		DOMs.tableContainer.innerHTML = '';
	}
};

// Initialise event listsners
const initEventListeners = () => {
	// Score container
	DOMs.scoresBtn.addEventListener('click', () => {
		DOMs.scoresCont.classList.toggle('open');
	});
	DOMs.closeScoresBtn.addEventListener('click', () => {
		DOMs.scoresCont.classList.toggle('open');
	});
	// Fixtures container
	DOMs.fixturesBtn.addEventListener('click', () => {
		DOMs.fixturesCont.classList.toggle('open');
	});
	DOMs.closeFixtBtn.addEventListener('click', () => {
		DOMs.fixturesCont.classList.toggle('open');
	});
	// Click on card
	DOMs.savedleaguesCont.addEventListener('click', async (e) => {
		// Aplly active class to card
		leaguesView.cardControl(e);
		// Insert required league
		insertActiveLeague(state);
		// Update scores
		scoresControl();
		// Update Fixtures
		fixturesControl();
		// Reset score pagination
		scoresView.resetScorePagination(state);
		// Reset fixtures pagination
		fixturesView.resetFixturesPagination(state);
	});
	// Scores round control pagination
	DOMs.resultsRoundControlCont.addEventListener('click', (e) => {
		scoresView.scoreRoundPagination(e, state);
	});
	// Fixtures round control pagination
	DOMs.fixturesRoundControlCont.addEventListener('click', (e) => {
		fixturesView.fixturesRoundPagination(e, state);
	});
};

homeControl();
