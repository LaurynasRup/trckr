import {DOMs, htmlEl} from '../base';

export const manipulateCards = (arr) => {
    if(arr.length >= 0) {
        // loop through cards, if item in array matches id of card, add active class
        DOMs.leagueCards.forEach(card => {
            if(arr.includes(card.id)) {
                card.classList.add('active');
            };
            if(card.classList.contains('active')) {
                card.lastElementChild.innerHTML = htmlEl.activeCardBtn;
            } else {
                card.lastElementChild.innerHTML = htmlEl.cardBtn;
            }
        });
    };
};

export const userMsg = (msg) => {
    DOMs.userMsgText.innerText = msg;
    DOMs.userMsgCont.classList.add('active');

    setTimeout(() => {
        DOMs.userMsgCont.classList.remove('active');
    }, 3000);
};

export const addActiveClass = (el) => {
    el.classList.add('active');
}

export const removeActiveClass = (el) => {
    el.classList.remove('active');
}