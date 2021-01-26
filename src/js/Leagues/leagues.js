import * as dbConnectModel from './Models/dbConnection';
import * as cardView from './View/cardView';
import * as cardModel from './Models/cardModel';
import { DOMs, strings } from './base';

const state = {
	retrievedLeagues: [],
	likedLeagues: [],
};

// Leagues Control
const leaguesControl = async () => {
	// Get logged in email
	const loggedEmail = JSON.parse(sessionStorage.getItem('loggedInUser'));
	// Fetch and store data in state
	state.retrievedLeagues = await fetchStored(state, loggedEmail);
	// Manipulate view of liked leagues on load
	cardView.manipulateCards(state.retrievedLeagues);
	// Add event listsner for each card
	DOMs.leagueCards.forEach((card) => {
		card.addEventListener('click', (e) => {
			if (e.target.className === 'league-hover') {
				if (card.classList.contains('active')) {
					// Delete league from array
					cardModel.deleteLeague(card.id, state.retrievedLeagues);
					// Remove active class from DOM el
					cardView.removeActiveClass(card);
					// Display user msg
					cardView.userMsg(strings.leagueDeleted);
				} else {
					// Add league to array
					cardModel.addleague(card.id, state.retrievedLeagues);
					// add active class to DOM el
					cardView.addActiveClass(card);
					// Display user msg
					cardView.userMsg(strings.leagueAdded);
				}
				// Update card appearances
				cardView.manipulateCards(state.retrievedLeagues);
				// Store data into the database
				dbConnectModel.storeData(
					JSON.stringify(state.retrievedLeagues),
					loggedEmail
				);
			}
		});
	});
};

// Fetch data and store in state
const fetchStored = async (obj, mail) => {
	// fetch data from DB
	const likedLeagues = await dbConnectModel.fetchData(mail);
	// If there is data, store in state
	if (likedLeagues) {
		return JSON.parse(likedLeagues);
	} else {
		return [];
	}
};

// Init Function
const init = () => {
	// Check for session
	if (!sessionStorage.getItem('loggedInUser')) {
		location.href = './login.html';
	}
	leaguesControl();
};

init();
