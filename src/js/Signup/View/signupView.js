export const userMsg = (msgEl, msg, msgBody) => {
    msg.innerText = `${msgBody}`;
    msgEl.classList.add('active');

    setTimeout(() => {
        msgEl.classList.remove('active');
    }, 2500);
};