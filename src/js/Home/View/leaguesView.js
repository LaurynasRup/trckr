import { DOMs, strings } from '../base';

// Create HTML str for liked leagues
export const insertLeaguesDOM = (arr) => {
	const leaguesHtmlStr = arr
		.map((el) => {
			const html = strings.storedLeagueHtml;
			let newHtml = html.replace('RPLC', el);

			newHtml = newHtml.replace('RPLC2', el);

			return newHtml;
		})
		.join('');

	DOMs.savedleaguesInner.innerHTML = leaguesHtmlStr;
	addActiveMid(arr);

	// Set width of container
	if (arr.length < 5) {
		DOMs.savedleaguesInner.style.width = `${arr.length * 180}px`;
	} else if (arr.length > 4 && arr.length % 2 > 0) {
		DOMs.savedleaguesInner.style.width = `900px`;
	} else {
		DOMs.savedleaguesInner.style.width = `900px`;
		DOMs.savedleaguesInner.classList.add('over5');
	}
};

// Add active class to middle element of the array on load
const addActiveMid = (arr) => {
	if (arr.length > 1) {
		const children = DOMs.savedleaguesInner.children;
		const middleChild = children[Math.floor(children.length / 2)];
		middleChild.classList.add('active');
	} else if (arr.length === 1) {
		const child = DOMs.savedleaguesInner.children[0];
		child.classList.add('active');
	}
};

export const cardControl = (e) => {
	// Get the clicked card
	const card = e.target.closest('.saved-league-card');
	if (card) {
		// Remove active class from the rest of siblings
		const siblings = DOMs.savedleaguesInner.children;
		siblings.forEach((sibling) => {
			sibling.classList.remove('active');
		});
		// Add active class to clicked card
		card.classList.add('active');

		// slide cont if not 2, 4 dom els
		if (siblings.length !== 2 && siblings.length !== 4) {
			// Slide container
			slideCont(siblings, card);
		}
	}
};

// slide leagues container after click on card
const slideCont = (coll, card) => {
	// Html Coll - to array
	const array = Array.from(coll);
	// Find index of active element
	const index = array.indexOf(card);
	// Find Middle of array
	const middle = Math.floor(array.length / 2);
	// Distance to slide container
	let distance = middle - index;
	let side = 'left';
	if (distance < 0) {
		distance *= -1;
		side = 'right';
	}
	// Width of the card element
	const elWidth = card.clientWidth + 60;

	// Move container
	rearangeDomEls(side, distance, coll);
};

const rearangeDomEls = (side, dist, els) => {
	const copiedEls = [];
	if (side === 'right') {
		// copy items from the beggining of nodelist
		for (let i = 0; i < dist; i++) {
			copiedEls.push(els[i]);
		}
		// add to the end of nodelist
		copiedEls.forEach((el) => {
			DOMs.savedleaguesInner.appendChild(el);
		});
	} else {
		// copy items from the end of nodelist
		for (let i = 0; i < dist; i++) {
			const lastEl = els.length - 1;
			copiedEls.push(els[lastEl - i]);
		}
		// Add to the beggining
		copiedEls.forEach((el) => {
			DOMs.savedleaguesInner.insertBefore(
				el,
				DOMs.savedleaguesInner.firstChild
			);
		});
	}
};

// Main container controll
export const mainContView = (arr) => {
	if (arr.length <= 0) {
		// Display no leagues message
		DOMs.tableTitle.innerText = strings.noLeagues;
		// Hide buttons
		DOMs.scoresBtn.classList.add('hidden');
		DOMs.fixturesBtn.classList.add('hidden');
		document.body.style.overflow = 'hidden';
	}
};
